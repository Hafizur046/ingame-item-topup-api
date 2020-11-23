const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  playerId: {
    type: String,
    required: false,
  },
  accountPlatform: {
    type: String,
    required: false,
  },
  emailOrNumber: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
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
