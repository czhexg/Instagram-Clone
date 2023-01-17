require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateAccessToken(id) {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
    });
}

function generateRefreshToken(id) {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });
}

module.exports = { generateAccessToken, generateRefreshToken };
