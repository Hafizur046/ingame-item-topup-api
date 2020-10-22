function createGame(Game) {
  return async (req, res) => {
    const game = new Game();
    game.name = req.body.name;
    game.image = req.body.image;

    //validating game
    if (game.validateSync()) {
      const validationError = game.validateSync().message;
      return res.send(validationError);
    }

    //save game and respond
    try {
      const response = await game.save();
      res.send(response);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = createGame;
