const express = require("express");
const orderRoutes = express.Router();

//importing models
const User = require("../../models/user.js");
const Order = require("../../models/order.js");

//importing middleware
const orderPackage = require("./order_package.js");
const IncreamentalId = require("../../models/increamental_id.js");

//managing all the routes
orderRoutes.post("/place", orderPackage(Order, User, IncreamentalId));

module.exports = orderRoutes;
