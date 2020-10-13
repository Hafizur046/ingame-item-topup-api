const express = require("express");
const router = express.Router();

//importing routes
const authRoutes = require("./authentication/index.js");
const adminRoutes = require("./admin/index.js");
const orderRoutes = require("./order/index.js");

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/order", orderRoutes);

module.exports = router;
