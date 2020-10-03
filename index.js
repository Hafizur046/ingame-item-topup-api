//Import modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");

//configuring enivorent variables
require("dotenv").config();

//constants
const PORT = 3000;
const DB_URI = process.env["DB_URI"];

//bug fixing
// console.log(DB_URI)

//Initializing express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Importing models
const User = require("./models/user.js");

//Importing middlewares
const Authenticate = require("./routes/authentication/auth.js");

//Importing router
const router = require("./routes/index.js");

//connecting to database
mongoose.connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
let db = mongoose.connection;

//Using coustom middlewares
app.use(Authenticate(User));

//Connected to database
db.once("open", async (err) => {
  if (!err) {
    console.log("connected to database");
  } else {
    console.log(err);
  }
});

//Setting express router
app.use("/api", router);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`server started at port ${PORT}`);
  } else {
    console.log("errot starting server on port:" + PORT);
  }
});
console.log("hello world");
