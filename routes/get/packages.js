function getPackage(Package) {
  return async (req, res) => {
    if (req.params.id) {
      res.send(Package.findById(req.params.id));
    }
    if (!req.query.game) {
      return res.send(await Package.find());
    }
    if (req.query.id) {
      return res.send(await Package.findById(req.query.id));
    }
    res.send(await Package.find({ game: req.query.game }).populate("game"));
  };
}

module.exports = getPackage;
