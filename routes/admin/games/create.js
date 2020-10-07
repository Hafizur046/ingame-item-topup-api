function createGame(Game) {
  return async (req, res) => {
    const package = new Game();
    package.name = req.body.name;
    package.price = req.body.price;
    package.game = req.body.game;

    //validating package
    const validationError = package.validateSync().message;
    if (validationError) {
      return res.send(validationError);
    }

    //save package and respond
    try {
      const response = await package.save();
      res.send(response);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = createGame;
