const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.listen(8000, () => {
  console.log("Server is up and running");
});

//conneting to the database
mongoose
  .connect("mongodb://localhost:27017/auth-demo")
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

//coding related to user
//schema related to users

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is mandatory"],
    },
    email: {
      type: String,
      required: [true, "Email is mandatory"],
    },
    password: {
      type: String,
      required: [true, "Password is mandatory"],
    },
  },
  { timestamps: true }
);

// model for user
const userModel = mongoose.model("users", userSchema);

//endpoint to create a user
app.post("/register", (req, res) => {
  let user = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(user.password, salt, (err, hpass) => {
        if (!err) {
          user.password = hpass;
          userModel
            .create(user)
            .then((doc) => {
              res
                //.status(201)
                .send({ message: "User Registration Successfull" });
            })
            .catch((err) => {
              console.log(err);
              res.send({ message: "Some Problem" });
            });
        }
      });
    }
  });
});

//endpoint for login
app.post("/login", (req, res) => {
  console.log(req.body);

  let userCred = req.body;

  userModel
    .findOne({ email: userCred.email })
    .then((user) => {
      if (user != null) {
        bcrypt.compare(userCred.password, user.password, (err, result) => {
          if (result == true) {
            // generate a token and send it back
            jwt.sign({ email: userCred.email }, "thorabhkey", (err, token) => {
              if (!err) {
                console.log("here");
                console.log(token);
                res.send({ token: token });
              } else {
                res.send({ messgae: "Some issue while creating the token" });
              }
            });
            //res.send({ message: "Login Successfull" });
          } else {
            res.send({ message: "Incorrect Password" });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem" });
    });
});

app.get("/getdata", verifyToken, (req, res) => {
  res.send({ message: "I am a bad developer with a good heart" });
});

function verifyToken(req, res, next) {
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "thorabhkey", (err, data) => {
    if (!err) {
      console.log(data);
      next();
    } else {
      res.send({ message: "Invalid token please login again" });
    }
  });
}
