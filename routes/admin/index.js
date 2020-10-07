const express = require("express");
const adminRoutes = express.Router();

//importing models
const Package = require("../../models/package");
const Game = require("../../models/game.js");

//importing middlewares
const createpackage = require("./packages/create_package.js");
const modifyPackage = require("./packages/modify_package.js");
const deletePackage = require("./packages/delete_package.js");
const createGame = require("./games/create.js");
const modifyGame = require("./games/modify.js");
const deleteGame = require("./games/delete.js");

adminRoutes.post("/createpackage", createpackage(Package));
adminRoutes.patch("/modifypackage", modifyPackage(Package));
adminRoutes.delete("/deletepackage", deletePackage(Package));

adminRoutes.post("/createpackage", createGame(Game));
adminRoutes.patch("/modifypackage", modifyGame(Game));
adminRoutes.delete("/deletepackage", deleteGame(Game));

module.exports = adminRoutes;
