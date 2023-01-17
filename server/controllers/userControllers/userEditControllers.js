const User = require("../../Models/userModel");

function editBio(req, res) {
    const { id, bio } = req.body;

    User.findByIdAndUpdate(
        id,
        { bio: bio },
        { new: true },
        (err, foundUser) => {
            if (err) {
                res.status(404).json("User not found");
            }

            // might not need to send back anything since frontend can just use the user input to update bio
            res.json({
                _id: foundUser.id,
                fullname: foundUser.fullname,
                username: foundUser.username,
                email: foundUser.email,
                picture: foundUser.picture,
                bio: foundUser.bio,
            });
        }
    );
}

function addFollowers(req, res) {
    const { id, follower_id } = req.body;
    User.findByIdAndUpdate(
        id,
        {
            $addToSet: { followers: follower_id },
        },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                res.status(404).json("User not found");
            }
            res.json({
                _id: updatedUser.id,
                fullname: updatedUser.fullname,
                username: updatedUser.username,
                email: updatedUser.email,
                picture: updatedUser.picture,
                bio: updatedUser.bio,
                followers: updatedUser.followers,
            });
        }
    );
}

function deleteFollowers(req, res) {
    const { id, follower_id } = req.body;
    User.findByIdAndUpdate(
        id,
        { $pull: { followers: follower_id } },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                res.status(404).json("User not found");
            }
            res.json({
                _id: updatedUser.id,
                fullname: updatedUser.fullname,
                username: updatedUser.username,
                email: updatedUser.email,
                picture: updatedUser.picture,
                bio: updatedUser.bio,
                followers: updatedUser.followers,
            });
        }
    );
}

function addFollowing(req, res) {
    const { id, following_id } = req.body;
    User.findByIdAndUpdate(
        id,
        { $addToSet: { following: following_id } },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                res.status(404).json("User not found");
            }
            res.json({
                _id: updatedUser.id,
                fullname: updatedUser.fullname,
                username: updatedUser.username,
                email: updatedUser.email,
                picture: updatedUser.picture,
                bio: updatedUser.bio,
                following: updatedUser.following,
            });
        }
    );
}

function deleteFollowing(req, res) {
    const { id, following_id } = req.body;
    User.findByIdAndUpdate(
        id,
        { $pull: { following: following_id } },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                res.status(404).json("User not found");
            }
            res.json({
                _id: updatedUser.id,
                fullname: updatedUser.fullname,
                username: updatedUser.username,
                email: updatedUser.email,
                picture: updatedUser.picture,
                bio: updatedUser.bio,
                following: updatedUser.following,
            });
        }
    );
}

function addSavedPosts(req, res) {
    const { id, post_id } = req.body;
    User.findByIdAndUpdate(
        id,
        { $addToSet: { savedPosts: post_id } },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                res.status(404).json("User not found");
            }
            res.json({
                _id: updatedUser.id,
                fullname: updatedUser.fullname,
                username: updatedUser.username,
                email: updatedUser.email,
                picture: updatedUser.picture,
                bio: updatedUser.bio,
                savedPosts: updatedUser.savedPosts,
            });
        }
    );
}

function deleteSavedPosts(req, res) {
    const { id, post_id } = req.body;
    User.findByIdAndUpdate(
        id,
        { $pull: { savedPosts: post_id } },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                res.status(404).json("User not found");
            }
            res.json({
                _id: updatedUser.id,
                fullname: updatedUser.fullname,
                username: updatedUser.username,
                email: updatedUser.email,
                picture: updatedUser.picture,
                bio: updatedUser.bio,
                savedPosts: updatedUser.savedPosts,
            });
        }
    );
}

module.exports = {
    editBio,
    addFollowers,
    deleteFollowers,
    addFollowing,
    deleteFollowing,
    addSavedPosts,
    deleteSavedPosts,
};
