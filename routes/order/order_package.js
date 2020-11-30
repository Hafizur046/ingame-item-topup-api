const Package = require("../../models/package");
const webPush = require("web-push");

function orderPackage(Order, Subscription) {
  return async (req, res) => {
    //validation
    if (!req.body.package || !req.body.bkashNumber) {
      res.json({ err: "Provide all the fucking fields" });
      return;
    }

    //creating a new instance of Order Model
    const order = new Order();
    //setting all the paths
    order.package = req.body.package;
    order.accountPlatform = req.body.accountPlatform;
    order.orderedBy = req.user._id;
    order.bkashNumber = req.body.bkashNumber;

    //checking if the package type is promo or not...
    //if its promo then user would provide playerId otherwise emailOrNumber and password
    let package = await Package.findById(req.body.package);
    if (package.type !== "promo") {
      if (!req.body.emailOrNumber || !req.body.password) {
        res.json({ err: "Provide all the fucking fields" });
        return;
      }
      order.emailOrNumber = req.body.emailOrNumber;
      order.password = req.body.password;
    } else {
      order.playerId = req.body.playerId;
      if (!req.body.playerId) {
        res.json({ err: "Provide all the fucking fields" });
        return;
      }
    }

    //validation using mongoose
    if (order.validateSync()) {
      console.log(order.validateSync());
      return res.json({ err: order.validateSync()._message });
    }

    //setting the order Id so that its a number
    //this is not a good solution
    order._id = await Order.countDocuments();

    try {
      await order.save();

      //get all the subscriptions
      let subscriptions = await Subscription.find();

      //create a payload
      let payload = JSON.stringify({
        title: "Oi mea tumar order aise",
        body: `${package.name} chaitase dam hoilo ${package.price}`,
      });
      res.json({});

      //loop through every subscription
      subscriptions.forEach((subscription) => {
        //send a notification using webPush
        webPush.sendNotification(subscription, payload).catch((err) => {
          console.log(err);
        });
      });
    } catch (error) {
      console.log(error);
      res.json({ err: "some fucking error has occured in mongodb" });
    }
  };
}

module.exports = orderPackage;
