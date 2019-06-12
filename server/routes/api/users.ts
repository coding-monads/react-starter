import express, { NextFunction, Request, Response } from 'express';

import { auth } from '../../middleware/auth';

import * as usersController from '../../controllers/users/users';
import * as usersValidator from '../../controllers/users/usersValidator';

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
	(req: Request, res: Response, next: NextFunction) =>
		auth(req, res, next, {authEmail: false}),
	usersController.getUser
);

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
	'/register',
	usersValidator.validate(REGISTER_USER),
	usersController.registerUser
);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post(
	'/login',
	usersValidator.validate(LOGIN_USER),
	usersController.loginUser
);

// @route   DELETE api/users
// @desc    Delete user
// @access  Private
router.delete(
	'/',
	(req: Request, res: Response, next: NextFunction) => auth(req, res, next, {}),
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
	(req: Request, res: Response, next: NextFunction) => auth(req, res, next, {}),
	usersValidator.validate(UPDATE_USER),
	usersController.updateUserData
);

export default router;
