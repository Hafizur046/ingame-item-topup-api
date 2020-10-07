function deletePackage(Package) {
  return async (req, res) => {
    Package.findByIdAndDelete(req.params.id);
    res.send("deleted");
  };
}

module.exports = deletePackage;
