const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: false,
  },
  privillage: {
    type: String,
    default: "user",
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
  phone: {
    type: String,
    minlength: 11,
    maxlength: 11,
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
  isBlocked: {
    type: Boolean,
    default: false,
    required: false,
  },
  orders: [{ type: Number, ref: "Order" }],
});

let User = mongoose.model("User", userSchema);
module.exports = User;
