const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/users/users");
const usersValidator = require("../../controllers/users/usersValidator");
const { REGISTER_USER } = require("../../controllers/users/methods");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  usersValidator.validate(REGISTER_USER),
  usersController.registerUser
);

module.exports = router;
