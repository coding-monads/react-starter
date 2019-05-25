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

// @route   GET api/users/activate/:userId/:activationKey
// @desc    Activate account
// @access  Public
router.get('/activate/:userId/:activationKey', usersController.activateUser);

module.exports = router;
