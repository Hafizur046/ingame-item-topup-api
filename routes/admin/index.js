const express = require("express");
const adminRoutes = express.Router();

//importing models
const Package = require("../../models/package");

//importing middlewares
const createpackage = require("./packages/create_package.js");
const modifyPackage = require("./packages/modify_package.js");
const deletePackage = require("./packages/delete_package.js");

adminRoutes.post("/createpackage", createpackage(Package));
adminRoutes.patch("/modifypackage", modifyPackage(Package));
adminRoutes.delete("/deletepackage", deletePackage(Package));

module.exports = adminRoutes;
