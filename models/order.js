const mongoose = require("mongoose");
const { text } = require("body-parser");

const orderSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  accountPlatform: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  bkashNumber: {
    type: String,
    required: true,
  },
  orderedAt: {
    type: Date,
    default: new Date(),
    required: false,
  },
  status: {
    type: String,
    default: "Pending",
    required: false,
  },
  orderedBy: {
    type: Number,
    ref: "User",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
