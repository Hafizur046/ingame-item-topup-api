const mongoose = require("mongoose");

//defining schema
const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
});

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
