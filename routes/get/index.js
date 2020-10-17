const express = require("express");
const getRoutes = express.Router();

//importing models
const Game = require("../../models/game");
const Package = require("../../models/package");

//importing middleware
const getGames = require("./games");
const getPackage = require("./packages");

//managing all the routes
getRoutes.get("/games", getGames(Game));
getRoutes.get("/packages", getPackage(Package));

module.exports = getRoutes;
