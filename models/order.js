const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
