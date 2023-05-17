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

      const token = jwt.sign({ email: result.email }, JWT_SECRET);

      if (res.status(201)) {
        res.send({ status: 'OK', data: token });
      }

    }
    else {
      res.send({ status: 'Account Doesn\'t Exists' });
    }
  }
  catch {
    res.send({ status: "err" })
  }

})


api.post('/userLogged', async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const email = user.email;

    User.findOne({ email: email })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch(error => {
        res.send({ status: "error", data: error });
      })
  }
  catch { }
})

api.post('/fetchuser/:email', async (req, res) => {
  const email = req.params.email;

  const userData = await User.findOne({ email: email })

  if (userData) {
    res.send(userData);
  }
  else {
    console.log("User not found");
  }

})

api.post('/fetchuser/:email', async (req, res) => {
  const email = req.params.email;

  const userData = await User.findOne({ email: email })

  if (userData) {
    res.send(userData);
  }
  else {
    console.log("User not found");
  }
})

api.post('/fetchuserposts/:email', async (req, res) => {

  const email = req.params.email;
  const data = await Post.find({ email: email });

  const postArr = [];

  data.forEach(post => {
    postArr.push(post);
  })

  res.send(postArr);
})

api.post('/post', async (req, res) => {
  const { email, username, title, content_, votelist } = req.body;
  const userData = await User.findOne({ email: email })

  if (userData) {

    userData.posts = userData.posts + 1;



    await User.findOneAndUpdate({ email: email }, userData)


    const data = new Post({
      email: email,
      username: username,
      title: title,
      content_: content_,
      votelist: votelist
    })



    // saves the data into mongodb
    const val = await data.save();

    res.json(val);
  }
  else {
    res.send("bad User")
  }


})

api.post('/post/delete/:email/:id', async (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  await Post.findByIdAndDelete(id)
    .then(async () => {
      const userData = await User.findOne({ email: email })

      if (userData) {

        userData.posts = userData.posts - 1;

        await User.findOneAndUpdate({ email: email }, userData)
      }
      res.send("Post Deleted!");
    })
    .catch(() => {
      res.send("Post NOT Deleted!");
    })
})

api.post('/fetchall', async (req, res) => {
  const data = await Post.find({});

  const postArr = [];

  data.forEach(post => {
    postArr.push(post);
  })

  res.send(postArr);

})

api.post('/fetchallusers', async (req, res) => {
  const data = await User.find({});

  const postArr = [];

  data.forEach(post => {
    postArr.push(post);
  })

  res.send(postArr);

})

api.post('/post/addVote/:email/:id', async (req, res) => {
  const email = req.params.email;
  const postid = req.params.id;

  Post.findById(postid)
    .then((currPost) => {

      if (currPost.votelist.includes(email) == false) {
        currPost.votelist.push(email);
        Post.findByIdAndUpdate(postid, currPost)
          .then(async (data) => {
            if (data) {
              const userData = await User.findOne({ email: currPost.email })

              if (userData) {

                userData.respect = userData.respect + 1;

                await User.findOneAndUpdate({ email: currPost.email }, userData)
                res.send("Voted");
              }
            }
            else {
              res.send("voting failed");
            }
          }).catch((error) => { res.send("Error inside working") })
      }
      else {
        res.send("Already Voted");
      }
    })
    .catch(error => {
      res.send("Error updating vote");
      console.log(error);
    });
})

api.post('/post/removeVote/:email/:id', async (req, res) => {
  const email = req.params.email;
  const postid = req.params.id;

  function matchID(votee) {
    return votee != email;
  }
  Post.findById(postid)
    .then((currPost) => {
      if (currPost.votelist.includes(email) == true) {
        currPost.votelist = currPost.votelist.filter(matchID);

        Post.findByIdAndUpdate(postid, currPost).then(async (data) => {
          if (data) {
            const userData = await User.findOne({ email: currPost.email })

            if (userData) {

              userData.respect = userData.respect - 1;

              await User.findOneAndUpdate({ email: currPost.email }, userData)
              res.send("Deleted");
            }
          }
          else {
            res.send("de-voting failed");
          }
        }).catch((error) => { res.send("Error inside working") })
      }
      else {
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
