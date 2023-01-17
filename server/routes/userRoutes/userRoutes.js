const express = require("express");

const userAuthRoutes = require("./userAuthRoutes");
const userEditRoutes = require("./userEditRoutes");
const refreshTokenRoute = require("./refreshTokenRoute");

const router = express.Router();

router.use("/", userAuthRoutes);

router.use("/refresh", refreshTokenRoute);

router.use("/edit", userEditRoutes);

module.exports = router;
