const mongoose = require("mongoose");

const orderIdSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
});

const IncreamentalId = mongoose.model("IncreamentalId", orderIdSchema);

module.exports = IncreamentalId;
