import express from "express";
const router = express.Router();

import * as usersController from "../../controllers/users/users";
import * as usersValidator from "../../controllers/users/usersValidator";

import {
  REGISTER_USER,
  LOGIN_USER,
  UPDATE_USER
} from "../../controllers/users/methods";

import auth from "../../middleware/auth";

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

// @route   DELETE api/users
// @desc    Delete user
// @access  Private
router.delete("/", auth, usersController.deleteUser);

// @route   GET api/users/activate/:activationKey
// @desc    Activate account
// @access  Public
router.get("/activate/:activationKey", usersController.activateUser);

// @route   PUT api/users
// @desc    Change user data
// @access  Private
router.put(
  "/",
  auth,
  usersValidator.validate(UPDATE_USER),
  usersController.updateUserData
);

export default router;
