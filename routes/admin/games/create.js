function createGame(Game) {
  return async (req, res) => {
    const game = new Game();
    game.name = req.body.name;
    game.image = req.body.image;

    //validating game
    if (game.validateSync()) {
      const validationError = game.validateSync().message;
      console.log("the error is", validationError);
      return res.send(validationError);
    }

    //save game and respond
    try {
      //console.log(game);
      const response = await game.save();
      console.log("the response :", response);
      res.send(response);
    } catch (err) {
      console.log("origin of the error", err);
    }
  };
}

module.exports = createGame;
