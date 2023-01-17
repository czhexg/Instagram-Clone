require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../Models/userModel");

function verifyJWT(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }

        User.findById(decoded.id, "-password", (err, foundUser) => {
            req.user = foundUser;
            next();
        });
    });
}

module.exports = verifyJWT;
