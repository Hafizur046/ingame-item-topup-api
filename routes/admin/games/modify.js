function modifyGame(Game) {
  return async (req, res) => {
    const game = {};

    if (req.body.name) {
      game.name = req.body.name;
    }
    if (req.body.image) {
      game.image = req.body.image;
    }

    await Game.updateOne({ _id: req.params.id }, game);
    res.json({});
  };
}

module.exports = modifyGame;
