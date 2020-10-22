function modifyPackage(Package) {
  return async (req, res) => {
    const package = {};

    if (req.body.name) {
      package.name = req.bod.name;
    }
    if (req.body.price) {
      package.price = req.body.price;
    }

    Package.findByIdAndUpdate(req.params.id, package);
    res.send("processing");
  };
}

module.exports = modifyPackage;
