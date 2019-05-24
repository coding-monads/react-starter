const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/users/users");
const usersValidator = require("../../controllers/users/usersValidator");
const { REGISTER_USER } = require("../../controllers/users/methods");
const auth = require("../../middleware/auth");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  usersValidator.validate(REGISTER_USER),
  usersController.registerUser
);

// @route   DELETE api/users
// @desc    Delete user
// @access  Private
router.delete("/", auth, usersController.deleteUser);

module.exports = router;
