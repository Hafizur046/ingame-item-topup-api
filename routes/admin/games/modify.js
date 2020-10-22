function modifyGame(Game) {
  return async (req, res) => {
    const game = {};

    if (req.body.name) {
      game.name = req.bod.name;
    }
    if (req.body.image) {
      game.image = req.body.image;
    }

    Game.findByIdAndUpdate(req.params.id, game);
    res.send("processing");
  };
}

module.exports = modifyGame;
