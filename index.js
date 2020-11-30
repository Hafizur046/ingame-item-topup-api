//Import modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const webPush = require("web-push");

//configuring enivorent variables
require("dotenv").config();

//setting vapid details
webPush.setVapidDetails(
  "mailto:test@test.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

//constants
const PORT = process.env.PORT || 80;
const DB_URI = process.env["DB_URI"];

//Initializing express app
const app = express();

//using the cors package to manasge all the shits about cors
app.use(cors());

//parse application/x-www-form-urlencoded
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

//not responding to all the users that are blocked
app.use((req, res, next) => {
  if (req.user) {
    if (req.user.isBlocked) {
      return;
    }
  }
  next();
});

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
