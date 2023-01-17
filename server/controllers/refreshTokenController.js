require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../Models/userModel");

function handleRefreshToken(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    User.findOne({ refreshToken }, (err, foundUser) => {
        if (!foundUser) {
            return res.sendStatus(403);
        }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.id != decoded.id) {
                    return res.sendStatus(403);
                }
                const accessToken = jwt.sign(
                    { id: decoded.id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "10m" }
                );
                res.json({ accessToken });
            }
        );
    });
}

module.exports = handleRefreshToken;
