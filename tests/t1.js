const mongoose = require("mongoose");
const User = require("../models/user.js");
const IncreamentalId = require("../models/increamental_id.js");

//configuring enivorent variables
require("dotenv").config();

const DB_URI = process.env["DB_URI"];

//connecting to database
mongoose.connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
let db = mongoose.connection;

User.findOne({ username: "hafizur" }, (err, res) => {
  console.log(err);
  console.log(res);
});

IncreamentalId.find({}, (err, res) => {
  console.log(res);
});
