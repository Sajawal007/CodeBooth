const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const api = express();
const JWT_SECRET = "ha213782vieug238e()gconwisdqs"


api.use(express.json());
api.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));


mongoose.connect('mongodb://127.0.0.1:27017/codeybooth');
mongoose.connection.on('connected', () => { console.log('Server is up!') });
mongoose.connection.on('error', (err) => { console.log('Server up err - ', err) });


const registerSchema = {
  email: String,
  username: String,
  password: String
}
const User = mongoose.model("users", registerSchema);

api.get("/", (req, res) => {
  res.send("Hello World!");
});

api.post("/register", async (req, res) => {

  const { email, username, password } = req.body;
  
  const result = await User.findOne({ email: email });
  if (result) {
    res.send({ status: 'ALREADY EXISTS' });
  }
  else {
    try {
      const data = new User({
        email: email,
        username: username,
        password: password,
      })
      const val = await data.save();
      res.send({ status: "ACCOUNT CREATED" })
    }
    catch {
      res.send({ status: "err" })
    }
  }
})


api.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({ email: email, password: password });
    if (result) {
    
          const token = jwt.sign({email:result.email}, JWT_SECRET);
        
          if(res.status(201)){
            res.send({status:'OK', data:token});
          }
        
    }
    else {
      res.send({status: 'Account Doesn\'t Exists'});
    }
  }
  catch {
    res.send({ status: "err" })
  }

})


api.post('/userLogged', async(req,res)=>{
  const {token} = req.body;

  try{
    const user = jwt.verify(token, JWT_SECRET);
    const email = user.email;
  
    User.findOne({email:email})
    .then((data)=>{
      res.send({status:"ok", data:data});
    })
    .catch(error => {
      res.send({status: "error", data:error});
    })
  }
  catch{}
})




api.listen(3000, () =>
  console.log("[+] Server Listening at port 3000!")
);
