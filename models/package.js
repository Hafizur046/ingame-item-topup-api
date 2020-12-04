const mongoose = require("mongoose");

//defining schema
const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
});

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
