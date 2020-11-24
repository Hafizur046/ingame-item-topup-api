const express = require("express");
const authRoutes = express.Router();

//Importing models
const User = require("../../models/user.js");

//authentication middlewares
const Register = require("./register.js");
const SendConfirmation = require("./sendConfirmation.js");
const Verify = require("./verify.js");
const RemoveToken = require("./removetoken.js");
const Login = require("./login.js");
const modifyUser = require("./modify.js");

//Register Route
authRoutes.post(
  "/register",
  Register(User),
  //SendConfirmation(User),
  (req, res) => {
    res.json(req.user);
  }
);

//Login Route
authRoutes.post("/login", Login(User), (req, res) => {
  res.json({});
});

//password change route
authRoutes.patch("/changepassword", modifyUser(User));

//Resend email Route
authRoutes.get("/resend", SendConfirmation(User), (req, res) => {
  res.json({});
});

//Email Confirmation route
authRoutes.get("/register/confirm/:code", Verify(), (req, res) => {});

//Token remove route
authRoutes.get("/token/remove", RemoveToken(User), (req, res) => {
  res.json({});
});

module.exports = authRoutes;
