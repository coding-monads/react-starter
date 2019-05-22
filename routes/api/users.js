const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/users/users");
const usersValidator = require("../../controllers/users/usersValidator");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  usersValidator.validate("registerUser"),
  usersController.registerUser
);

module.exports = router;
