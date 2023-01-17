const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        poster: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        media_file: [String],
        post_content: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
        num_likes: { type: Number, default: 0 },
        num_comments: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
