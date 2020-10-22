const express = require("express");
const adminRoutes = express.Router();

//importing models
const Package = require("../../models/package");
const Game = require("../../models/game.js");
const Order = require("../../models/order");

//importing middlewares
const createpackage = require("./packages/create_package.js");
const modifyPackage = require("./packages/modify_package.js");
const deletePackage = require("./packages/delete_package.js");
const createGame = require("./games/create.js");
const modifyGame = require("./games/modify.js");
const deleteGame = require("./games/delete.js");
const getOrders = require("./orders/get");
const modifyOrder = require("./orders/modify");

adminRoutes.get("/orders", getOrders(Order), (req, res) => {
  res.json(res.result);
});
adminRoutes.patch("/orders", modifyOrder(Order));

adminRoutes.post("/packages", createpackage(Package));
adminRoutes.patch("/packages/:id", modifyPackage(Package));
adminRoutes.delete("/packages/:id", deletePackage(Package));

adminRoutes.post("/games", createGame(Game));
adminRoutes.patch("/games/:id", modifyGame(Game));
adminRoutes.delete("/games/:id", deleteGame(Game));

module.exports = adminRoutes;
