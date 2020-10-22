function getPackage(Package) {
  return async (req, res) => {
    if (req.params.id) {
      res.send(Package.findById(req.params.id));
    }
    res.send(await Package.find({ game: req.query.game }).populate("game"));
  };
}

module.exports = getPackage;
