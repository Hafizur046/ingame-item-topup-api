function modifyUser(User) {
  return async (req, res) => {
    if (!req.query.isBlocked || req.params.id) {
      return res.send("invalid");
    }
    if (!User.findById(req.query.id)) {
      console.log("yeah he has went through all ");
      return res.send("invalid");
    }

    let state = false;
    if (req.query.isBlocked === "block") {
      state = true;
    }

    res.send(
      await User.findOneAndUpdate({ _id: req.query.id }, { isBlocked: state })
    );
  };
}

module.exports = modifyUser;
