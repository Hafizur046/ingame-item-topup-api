const Package = require("../../models/package");

function orderPackage(Order, User, IncreamentalId) {
  return async (req, res) => {
    const order = new Order();
    //let INC_ID = await IncreamentalId.findByIdAndUpdate(
    //"5f855dc735cb59e472ac8a33",
    //{ id: { $inc: 1 } }
    //);
    order.package = req.body.package;
    order.accountPlatform = req.body.accountPlatform;
    order.orderedBy = req.user._id;
    //order.email = req.body.email;
    let package = await Package.findById(req.body.package);
    if (package.type !== "promo") {
      order.emailOrNumber = req.body.emailOrNumber;
      order.password = req.body.password;
    } else {
      order.playerId = req.body.playerId;
    }

    order.bkashNumber = req.body.bkashNumber;
    //validation
    if (order.validateSync()) {
      console.log(order.validateSync());
      return res.json({ err: order.validateSync()._message });
    }
    //console.log("this should be the order id ", INC_ID);
    order._id = await Order.countDocuments();

    try {
      let resOrder = await order.save();
      res.json(
        await User.findByIdAndUpdate(req.user._id, {
          $push: { orders: resOrder._id },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = orderPackage;
