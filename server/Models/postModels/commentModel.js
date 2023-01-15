const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
        commenter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comment: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
