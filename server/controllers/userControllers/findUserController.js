const User = require("../../Models/userModel");

function findUsers(req, res) {
    const { query } = req.body;

    User.find({ username: query }, (err, foundUsers) => {
        if (!foundUsers) {
            res.status(404).json("No users found");
        }
        res.json(
            foundUsers.map((foundUser) => {
                return { _id: foundUser.id, username: foundUser.username };
            })
        );
    });
}

module.exports = findUsers;
