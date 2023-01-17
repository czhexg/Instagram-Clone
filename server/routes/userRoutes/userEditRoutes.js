const express = require("express");
const {
    editBio,
    addFollowers,
    deleteFollowers,
    addFollowing,
    deleteFollowing,
    addSavedPosts,
    deleteSavedPosts,
} = require("../../controllers/userControllers/userEditControllers");
const router = express.Router();

router.route("/bio").patch(editBio);

router.route("/followers/add").patch(addFollowers);

router.route("/followers/delete").patch(deleteFollowers);

router.route("/following/add").patch(addFollowing);

router.route("/following/delete").patch(deleteFollowing);

router.route("/saved-posts/add").patch(addSavedPosts);

router.route("/saved-posts/delete").patch(deleteSavedPosts);

module.exports = router;
