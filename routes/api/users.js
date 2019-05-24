const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/users/users");
const usersValidator = require("../../controllers/users/usersValidator");
const {
  REGISTER_USER,
  LOGIN_USER
} = require("../../controllers/users/methods");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  usersValidator.validate(REGISTER_USER),
  usersController.registerUser
);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  usersValidator.validate(LOGIN_USER),
  usersController.loginUser
);

module.exports = router;
