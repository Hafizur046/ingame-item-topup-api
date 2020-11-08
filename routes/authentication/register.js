const bcrypt = require("bcryptjs");

//const mongoose = require('mongoose');
//const Token = require('../../models/jwt.js');
const TokenHandler = require("./TokenHandler.js");

function isValid(user) {
  if (user.username) {
    if (user.email) {
      let parts = user.email.split("@");
      let afterPart = parts[1].split(".");
      if (
        parts.length === 2 &&
        afterPart.length === 2 &&
        user.email.split("").length < 50
      ) {
        if (user.password) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function Register(Model) {
  return async (req, res, next) => {
    console.log(req.body);
    if (isValid(req.body)) {
      try {
        let user = await Model.find({
          $or: [{ username: req.body.username }, { email: req.body.email }],
        }).exec();
        console.log("Users with same :", user);
        if (user.length > 0) {
          console.log("email or username is taken");
          console.log(user);
          return res.json({ err: "email or username is taken" });
        } else {
          let thisUser = new Model();
          thisUser.username = req.body.username;
          let salt = bcrypt.genSaltSync(10);
          let hashedPassword = bcrypt.hashSync(req.body.password, salt);
          thisUser.password = hashedPassword;
          thisUser.email = req.body.email;
          thisUser.phone = req.body.phone;
          thisUser.fullName = req.body.fullName;
          thisUser._id = Number(await Model.countDocuments());

          req.user = await thisUser.save();
          let userToken = new TokenHandler();
          let token = await userToken.getToken(req.user._id);
          res.setHeader("id", userToken.id);
          res.setHeader("key", userToken.key);
          //return next();
          res.json({ id: userToken.id, key: userToken.key });
        }
      } catch (error) {
        console.log(error);
        res.status(400);
        res.json({ err: "Something went wrong" });
      }
    } else {
      // next();
      return res.json({ err: "Provide all fields" });
    }
  };
}
module.exports = Register;
