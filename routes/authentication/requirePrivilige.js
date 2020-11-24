function requirePrivillage(privillage) {
  return function (req, res, next) {
    if (req.user) {
      if (req.user.privillage === privillage) {
        next();
      }
      return;
    }

    console.log("this is new yeah", req.user);
    res.status(401).json({ err: "unauthorized" });
  };
}

module.exports = requirePrivillage;
