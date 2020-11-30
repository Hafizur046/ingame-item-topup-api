const express = require("express");
const orderRoutes = express.Router();

//importing models
//const User = require("../../models/user.js");
//const IncreamentalId = require("../../models/increamental_id.js");
const Order = require("../../models/order.js");
const Subscription = require("../../models/subscription.js");

//importing middleware
const orderPackage = require("./order_package.js");

//managing all the routes
orderRoutes.post("/place", orderPackage(Order, Subscription));

module.exports = orderRoutes;
