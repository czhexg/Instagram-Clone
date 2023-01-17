require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");
// const postRoutes = require("./routes/postRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const likeRoutes = require("./routes/likeRoutes");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
// app.use("/api/notification", notificationRoutes);
// app.use("/api/post", postRoutes);
// app.use("/api/comment", commentRoutes);
// app.use("/api/like", likeRoutes);

connectDB().then(() => {
    const server = app.listen(port, () => {
        console.log(`Server started on port ${port}`);
        console.log("listening for requests");
    });
});
