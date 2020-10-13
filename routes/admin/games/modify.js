function modifyGame(Game) {
  return async (req, res) => {
    const game = {};

    if (req.body.name) {
      game.name = req.bod.name;
    }
    if (req.body.image) {
      game.price = req.body.price;
    }

    Game.findByIdAndUpdate(req.body.id, game);
    res.send("processing");
  };
}

module.exports = modifyGame;
