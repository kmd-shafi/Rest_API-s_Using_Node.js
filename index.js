const express = require("express");
const app = express();
const PORT = 3000;
// const users = require("./MOCK_DATA.json");
app.use(express.urlencoded({ extended: false }));
// const fs = require("fs");
const mongoose = require("mongoose");

// mongoose connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("connection failed", err));

//schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
//////////////////////////////////////
app.get("/users", async (req, res) => {
  let allDbUsers = await User.find({});
  const html = `<ul>
${allDbUsers.map((user) => `<li>${user.firstName}-${user.email}</li>`).join("")}
</ul>`;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.send(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "KATTUBADI" });
    return res.json({
      process: "success",
    });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({
      process: "success",
    });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({
      status: "fail",
      message: "please provide all fields",
    });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log(result);
  return res.status(201).json({
    msg: "success",
  });
});
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
