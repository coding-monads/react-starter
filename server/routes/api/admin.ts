import express, { NextFunction, Request, Response } from 'express';

import { auth } from '../../middleware/auth';

import * as usersController from '../../controllers/users/users';

const router = express.Router();

// @route   GET api/admin/userList
// @desc    Return user list
// @access  Private
router.get(
    '/userList',
    (req: Request, res: Response, next: NextFunction) => auth(req, res, next, true, true),
	usersController.getUserList
);

// @route   GET api/admin/user
// @desc    Delete user
// @access  Private
router.delete(
    '/user/:user_id',
    (req: Request, res: Response, next: NextFunction) => auth(req, res, next, true, true),
	usersController.deleteUser
);

export default router;
