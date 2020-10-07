function modifyGame(Game) {
  return async (req, res) => {
    const package = {};

    if (req.body.name) {
      package.name = req.bod.name;
    }
    if (req.body.image) {
      package.price = req.body.price;
    }

    Game.findByIdAndUpdate(req.body.id, package);
    res.send("processing");
  };
}

module.exports = modifyGame;
