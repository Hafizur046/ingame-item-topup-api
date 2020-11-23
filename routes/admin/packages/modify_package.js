function modifyPackage(Package) {
  return async (req, res) => {
    const package = {};

    if (req.body.name) {
      package.name = req.body.name;
    }
    if (req.body.price) {
      package.price = req.body.price;
    }

    console.log(package);
    try {
      res.send(await Package.findOneAndUpdate({ _id: req.params.id }, package));
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = modifyPackage;
