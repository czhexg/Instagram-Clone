const express = require("express");

const userAuthRoutes = require("./userAuthRoutes");
const userEditRoutes = require("./userEditRoutes");
const refreshTokenRoute = require("./refreshTokenRoute");
const findUsers = require("../../controllers/userControllers/findUserController");
const verifyJWT = require("../../middleware/verifyJWT");

const router = express.Router();

router.use("/", userAuthRoutes);

router.use("/refresh", refreshTokenRoute);

router.use(verifyJWT);

router.use("/edit", userEditRoutes);

router.route("/search").get(findUsers);

module.exports = router;
