//mongoBD
const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ Error: "User not found" });
  }
  return res.json(user);
}

async function handlePatchUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "KATTUBADI" });
  return res.json({
    process: "success",
  });
}
async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({
    process: "success",
  });
}
async function handlePostCreateNewUser(req, res) {
  let body = await req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "please provide all fields" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ msg: "success", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handlePatchUpdateUserById,
  handleDeleteUserById,
  handlePostCreateNewUser,
};
