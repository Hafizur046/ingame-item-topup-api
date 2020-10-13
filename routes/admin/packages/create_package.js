function createPackage(Package) {
  return async (req, res) => {
    const package = new Package();
    package.name = req.body.name;
    package.price = req.body.price;
    package.game = req.body.game;

    //validating package
    if (package.validateSync()) {
      const validationError = package.validateSync().message;
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

module.exports = createPackage;
