const mongoose = require("mongoose");

// defining schema
const gamesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

//defining model
const Game = mongoose.model("Game", gamesSchema);

//exporting model
module.exports = Game;
