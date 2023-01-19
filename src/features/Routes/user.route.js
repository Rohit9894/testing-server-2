const express = require("express");
const user = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();
userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    let oldUser = await user.findOne({ email });
    if (oldUser) {
      return res.send({ msg: "already exist" });
    }
    bcrypt.hash(password, 4, async (err, hash) => {
      const newUser = new user({ email, password: hash });
      await newUser.save();
      res.send({ msg: "register successfully" });
    });
  } catch (e) {
    res.status(201).send(e.message);
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let oldUser = await user.findOne({ email });
    if (oldUser) {
      let hashed_password = oldUser.password;
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign("userID:user._id", "bar");
          res.send({ msg: "success", token });
        } else {
          res.send({ msg: "invalid" });
        }
      });
    } else {
      res.send({ msg: "email not resgisterd" });
    }
  } catch (e) {
    res.send(e.message);
  }
});
module.exports = userRouter;
