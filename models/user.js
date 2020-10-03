const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: false,
  },
  permission: {
    type: String,
    required: false,
  },
  joinedAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
  email: {
    type: String,
    require: true,
  },
  emailConfirmed: {
    type: Boolean,
    required: false,
    default: false,
  },
  tempCode: {
    type: Number || Boolean,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
});

let User = mongoose.model("User", userSchema);
module.exports = User;

