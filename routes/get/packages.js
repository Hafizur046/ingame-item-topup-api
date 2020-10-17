function getPackage(Package) {
  return async (req, res) => {
    res.send(Package.find({ game: req.query.game }).populate("game"));
  };
}

module.exports = getPackage;
