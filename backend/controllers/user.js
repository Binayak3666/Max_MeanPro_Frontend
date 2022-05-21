const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//for passoword store we have follow the encript formate for that we have to install npm install --save bcrypt
exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "user created!",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message:"invalid authontication credintial!"
          });
        });
    })
    .catch((err) => {
      console.log(error, "from bcrypt hash");
    });
}
// first we need to validate user id and passowrd is present or not
// 2nd we have to create JWT token for that we need to in stall jwt package
// npm install --save jsonwebtoken
// reference link https://jwt.io/
exports.userLogin =  (req, res, next) => {
  let fatchedUser ;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fatchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fatchedUser.email, userID: fatchedUser._id },
         process.env.JWT_KEY,
         {expiresIn: "1h"}
         );
         res.status(200).json({
           token: token,
           expiresIn: 3600,
           userId: fatchedUser._id
         })
    })
    .catch((err) => {
      return res.status(401).json({
        message: "invalid authontication credintial!",
      });
    });
}
