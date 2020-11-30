const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    require: true,
  },
  keys: {
    auth: {
      type: String,
      require: true,
    },
    p256dh: {
      type: String,
      require: true,
    },
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
