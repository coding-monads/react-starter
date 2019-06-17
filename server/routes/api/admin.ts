import express from 'express';
import { auth } from '../../middleware/auth';
import * as usersController from '../../controllers/users/users';
import * as usersValidator from '../../controllers/users/usersValidator';
import checkErrors from '../../middleware/checkErrors';

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
    auth({authAdmin: true}),
	usersController.getUserList
);

// @route   POST api/admin/user
// @desc    Add new user
// @access  Private
router.post(
    '/user',
    auth({authAdmin: true}),
    usersValidator.validate(ADD_USER),
    checkErrors,
	usersController.addUser
);

// @route   GET api/admin/user/:user_id
// @desc    Update user
// @access  Private
router.put(
    '/user/:user_id',
    auth({authAdmin: true}),
    usersValidator.validate(UPDATE_USER),
    checkErrors,
	usersController.updateUserData
);

// @route   GET api/admin/user/:user_id
// @desc    Delete user
// @access  Private
router.delete(
    '/user/:user_id',
    auth({authAdmin: true}),
	usersController.deleteUser
);

export default router;
