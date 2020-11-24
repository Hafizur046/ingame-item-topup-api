const express = require("express");
const userRoutes = express.Router();

//importing models
const Order = require("../../models/order");

//importing middleware
const getOrderHistory = require("./orderhistory");

//managing all the routes
userRoutes.get("/getorderhistory", getOrderHistory(Order), (req, res) => {
  res.json(res.result);
});

module.exports = userRoutes;
