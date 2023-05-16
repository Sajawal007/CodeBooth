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


const UserSchema = {
  email: String,
  username: String,
  password: String,
  posts: Number,
  respect: Number,
  personal_text: String
}

const PostSchema = {
  email: String,
  username: String,
  title: String,
  content_: String,
  votelist: [String],
}


const User = mongoose.model("users", UserSchema);
const Post = mongoose.model("posts", PostSchema);

api.get("/", (req, res) => {
  res.send("Hello World!");
});

api.post("/register", async (req, res) => {

  const { email, username, password} = req.body;
  
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
        posts: 0,
        respect: 0,
        personal_text: "Loyality is everything, without loyality we are nothing",
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

api.post('/post',async(req,res) => {
  const {email, username, title, content_, votelist} = req.body;

  const data = new Post({
      email: email,
      username: username,
      title: title,
      content_: req.body.content_,
      votelist: votelist
  })

  // saves the data into mongodb
  const val = await data.save();

  res.json(val);

})

api.post('/post/addVote/:email/:id',async(req,res) => {
  const email = req.params.email;
  const postid = req.params.id;
  
  Post.findById(postid)
  .then((currPost)=>{
    
    if(currPost.votelist.includes(email) == false)
    {
      currPost.votelist.push(email);
      Post.findByIdAndUpdate(postid, currPost).then((data)=>{
      if(data) {
        res.send("Voted");
      }
      else{
        res.send("voting failed");
      }}).catch((error) => {res.send("Error inside working")})
    }
    else{
      res.send("Already Voted");
    }
  })
  .catch(error => {
    res.send("Error updating vote");
    console.log(error);
});
})

api.post('/post/removeVote/:email/:id',async(req,res) => {
  const email = req.params.email;
  const postid = req.params.id;
  
  Post.findById(postid)
  .then((currPost)=>{
    if(currPost.votelist.includes(email) == true)
    {
      const idx = currPost.votelist.indexOf(email);
      currPost.votelist.splice(idx, 1);

      Post.findByIdAndUpdate(postid, currPost).then((data)=>{
      if(data) {
        res.send("Deleted");
      }
      else{
        res.send("de-voting failed");
      }}).catch((error) => {res.send("Error inside working")})
    }
    else{
      res.send("Not Found");
    }
  })
  .catch(error => {
    res.send("Error updating vote");
    console.log(error);
});
})





api.listen(3000, () =>
  console.log("[+] Server Listening at port 3000!")
);
