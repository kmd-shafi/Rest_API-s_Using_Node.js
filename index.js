const express = require("express");
const app = express();
const PORT = 3000;

const userRouter = require("./routes/user");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares/index");
// middlewares
app.use(express.urlencoded({ extended: false })); // inbuilt

// routes
app.use("/api/users", userRouter);
// connection mongoDB
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1");

// middlewares
app.use(logReqRes("log.txt"));

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
