function createPackage(Package) {
  return async (req, res) => {
    const package = new Package();
    package.name = req.body.name;
    package.price = req.body.price;
    package.game = req.body.game;
    if (req.body.category) {
      package.category = req.body.category;
    }

    //validating package
    if (package.validateSync()) {
      const validationError = package.validateSync().message;
      return res.send(validationError);
    }

    //save package and respond
    try {
      await package.save();
      res.json({});
    } catch (err) {
      console.log(err);
      res.json({ err: "ops some fucking error has occured" });
    }
  };
}

module.exports = createPackage;
