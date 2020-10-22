function modifyOrder(Order) {
  return async (req, res) => {
    if (!req.query.status || req.params.id) {
      res.send("invalid");
    }
    if (!Order.findById(req.query.id)) {
      res.send("invalid");
    }

    res.send(
      await Order.findOneAndUpdate(
        { _id: req.query.id },
        { status: req.query.status }
      )
    );
  };
}

module.exports = modifyOrder;
