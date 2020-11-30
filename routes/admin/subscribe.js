function subscribe(Subscription) {
  return async (req, res) => {
    //create a new subscription Document from the Subscription Model using req.body
    const subscription = new Subscription(req.body);

    //validate the subscription object using mongoose
    if (subscription.validateSync()) {
      res.json({ err: "invalid subscription object" });
      return;
    }

    //save the subscription object and respond with an empty object
    await subscription.save();
    res.json({});
  };
}

module.exports = subscribe;
