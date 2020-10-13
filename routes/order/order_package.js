function orderPackage(Order, User, IncreamentalId) {
  return async (req, res) => {
    const order = new Order();
    let INC_ID = await IncreamentalId.findById("5f855dc735cb59e472ac8a33");
    order.package = req.body.package;
    order.orderedBy = req.User._id;

    //validation
    if (order.validateSync) {
      return res.send("invalid");
    }
    order._id = INC_ID;

    try {
      let resOrder = order.save();
      res.send(
        await User.findByIdAndUpdate(req.User._id, {
          $push: { orders: resOrder._id },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = orderPackage;
