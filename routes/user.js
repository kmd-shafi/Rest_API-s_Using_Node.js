const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleGetUserById,
  handlePatchUpdateUserById,
  handleDeleteUserById,
  handlePostCreateNewUser,
} = require("../controllers/user");

router.route("/").get(handleGetAllUsers).post(handlePostCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handlePatchUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
