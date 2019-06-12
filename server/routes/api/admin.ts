import express, { NextFunction, Request, Response } from 'express';
import { auth } from '../../middleware/auth';
import * as usersController from '../../controllers/users/users';
import * as usersValidator from '../../controllers/users/usersValidator';

import {
    ADD_USER,
    UPDATE_USER
} from '../../controllers/users/methods';

const router = express.Router();

// @route   GET api/admin/userList
// @desc    Return user list
// @access  Private
router.get(
    '/userList',
    (req: Request, res: Response, next: NextFunction) => auth(req, res, next, {authAdmin: true}),
	usersController.getUserList
);

// @route   POST api/admin/user
// @desc    Add new user
// @access  Private
router.post(
    '/user',
    (req: Request, res: Response, next: NextFunction) => auth(req, res, next, {authAdmin: true}),
    usersValidator.validate(ADD_USER),
	usersController.addUser
);

// @route   GET api/admin/user/:user_id
// @desc    Update user
// @access  Private
router.put(
    '/user/:user_id',
    (req: Request, res: Response, next: NextFunction) => auth(req, res, next, {authAdmin: true}),
    usersValidator.validate(UPDATE_USER),
	usersController.updateUserData
);

// @route   GET api/admin/user/:user_id
// @desc    Delete user
// @access  Private
router.delete(
    '/user/:user_id',
    (req: Request, res: Response, next: NextFunction) => auth(req, res, next, {authAdmin: true}),
	usersController.deleteUser
);

export default router;
