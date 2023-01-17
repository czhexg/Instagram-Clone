const User = require("../../Models/userModel");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../../config/generateTokens");

const bcrypt = require("bcrypt");
const saltRounds = 10;

function registerUser(req, res) {
    const { fullname, username, email, password, profilePicture } = req.body;

    if (!fullname || !username || !email || !password) {
        res.status(400).json("Please fill in all the fields!");
    }

    User.findOne({ email }, (err, foundUser) => {
        if (foundUser) {
            res.status(400).json("User already exists!");
        } else {
            bcrypt.hash(password, saltRounds, function (err, passwordHash) {
                if (err) {
                    res.status(500).json(
                        "Failed to hash password. Failed to create user."
                    );
                }
                if (profilePicture) {
                    newUser = new User({
                        fullname: fullname,
                        username: username,
                        email: email,
                        password: passwordHash,
                        profilePicture: profilePicture,
                    });
                } else {
                    newUser = new User({
                        fullname: fullname,
                        username: username,
                        email: email,
                        password: passwordHash,
                    });
                }
                newUser.save((err, savedUser) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json("Failed to create user.");
                    } else {
                        const refreshToken = generateRefreshToken(
                            savedUser._id
                        );
                        savedUser.refreshToken = refreshToken;
                        savedUser.save();
                        res.cookie("jwt", refreshToken, {
                            httpOnly: true,
                            // sameSite: "None",
                            // secure: true,
                            maxAge: 24 * 60 * 60 * 1000,
                        });
                        res.json({
                            _id: savedUser.id,
                            fullname: savedUser.fullname,
                            username: savedUser.username,
                            email: savedUser.email,
                            profilePicture: savedUser.profilePicture,
                            token: generateAccessToken(savedUser._id),
                        });
                    }
                });
            });
        }
    });
}

function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json("Please fill in all the fields!");
    }

    User.findOne({ email }, (error, foundUser) => {
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, (err, result) => {
                if (result == true) {
                    const refreshToken = generateRefreshToken(foundUser._id);
                    foundUser.refreshToken = refreshToken;
                    foundUser.save();
                    res.cookie("jwt", refreshToken, {
                        httpOnly: true,
                        // sameSite: "None",
                        // secure: true,
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    res.json({
                        _id: foundUser.id,
                        fullname: foundUser.fullname,
                        username: foundUser.username,
                        email: foundUser.email,
                        picture: foundUser.picture,
                        token: generateAccessToken(foundUser._id),
                    });
                } else {
                    res.status(401).json("Invalid Email or Password");
                }
            });
        } else {
            res.status(401).json("Invalid Email or Password");
        }
    });
}

function logoutUser(req, res) {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;

    User.findOne({ refreshToken }, (err, foundUser) => {
        if (!foundUser) {
            res.clearCookie("jwt", {
                httpOnly: true,
                // sameSite: "None",
                // secure: true,
            });
            return res.sendStatus(204);
        }

        foundUser.refreshToken = "";
        foundUser.save();

        res.clearCookie("jwt", {
            httpOnly: true,
            // sameSite: "None",
            // secure: true,
        });
        res.sendStatus(204);
    });
}

module.exports = { registerUser, loginUser, logoutUser };
