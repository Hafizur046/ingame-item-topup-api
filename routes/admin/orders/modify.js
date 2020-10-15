function modifyOrder(Order) {
  return async (req, res) => {
    if (!req.query.status || req.query.id) {
      res.send("invalid");
    }
    if (!Order.findById(req.query.id)) {
      res.send("invalid");
    }

    Order.findByIdAndUpdate(req.query.id, { status: req.query.status });
    res.send("processing");
  };
}

module.exports = modifyOrder;
