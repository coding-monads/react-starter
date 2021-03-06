import express from 'express';
import { auth } from '../../middleware/auth';
import * as usersController from '../../controllers/users/users';
import * as usersValidator from '../../controllers/users/usersValidator';
import checkErrors from '../../middleware/checkErrors';

import {
	REGISTER_USER,
	LOGIN_USER,
	UPDATE_USER,
	RESET_PASSWORD,
	UPDATE_PASSWORD,
} from '../../controllers/users/methods';
const router = express.Router();

// @route   GET api/users
// @desc    Return user depending on jwt
// @access  Private without emailVerified
router.get(
	'/',
	auth({authEmail: false}),
	usersController.getUser
);

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
	'/register',
	usersValidator.validate(REGISTER_USER),
	checkErrors,
	usersController.registerUser
);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post(
	'/login',
	usersValidator.validate(LOGIN_USER),
	checkErrors,
	usersController.loginUser
);

// @route   POST api/users/password/reset
// @desc    Reset user password
// @access  Public
router.post(
	'/password/reset',
	usersValidator.validate(RESET_PASSWORD),
	checkErrors,
	usersController.resetPassword
);

// @route   GET api/users/password/update
// @desc    Verify user password reset token and return decoded values
// @access  Public
router.get(
	'/password/update/:token',
	usersController.updatePasswordVerifyToken
);

// @route   POST api/users/password/update
// @desc    Update user password
// @access  Public
router.post(
	'/password/update',
	usersValidator.validate(UPDATE_PASSWORD),
	checkErrors,
	usersController.updatePassword
);

// @route   DELETE api/users
// @desc    Delete user
// @access  Private
router.delete(
	'/',
	auth({}),
	usersController.deleteUser
);

// @route   GET api/users/activate/:activationKey
// @desc    Activate account
// @access  Public
router.get('/activate/:activationKey', usersController.activateUser);

// @route   PUT api/users
// @desc    Change user data
// @access  Private
router.put(
	'/',
	auth({}),
	usersValidator.validate(UPDATE_USER),
	checkErrors,
	usersController.updateUserData
);

export default router;
