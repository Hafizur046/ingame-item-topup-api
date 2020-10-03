const express = require("express");
const router = express.Router();

//importing routes
const authRoutes = require("./authentication/index.js");
const adminRoutes = require("./admin/index.js");

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

module.exports = router;

