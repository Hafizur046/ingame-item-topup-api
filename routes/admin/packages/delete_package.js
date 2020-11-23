function deletePackage(Package) {
  return async (req, res) => {
    res.send(await Package.findByIdAndDelete(req.params.id));
  };
}

module.exports = deletePackage;
