import express from 'express';
import { auth } from '../../middleware/auth';
import * as usersController from '../../controllers/users/users';
import * as usersValidator from '../../controllers/users/usersValidator';
import checkErrors from '../../middleware/checkErrors';

import {
	REGISTER_USER,
	LOGIN_USER,
	UPDATE_USER
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
