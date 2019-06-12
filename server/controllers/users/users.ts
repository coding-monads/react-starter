import bcrypt from 'bcryptjs';
import config from 'config';
import messages from '../messages';
import User, { IUser } from '../../models/User';
import nodemailer, { TransportOptions } from 'nodemailer';
import { Response, Request } from 'express';
import signJwtToken from '../signJwtToken';

export const activateUser = async (req: Request, res: Response) => {
	const { activationKey } = req.params;
	try {
		const user = await User.findOne({ activationKey });
		if (user) {
			if (user.emailVerified) {
				return res.status(400).json({ msg: messages.KEY_HAS_BEEN_ACTIVATED });
			}
			user.emailVerified = true;
	
			await user.save();
			return res.status(200).json({ msg: messages.USER_ACTIVATED });
		} 
		return res.status(400).json({ msg: messages.ACTIVATION_KEY_IS_INCORRECT });
	} catch {
		res.status(500).send(messages.SERVER_ERROR);
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.user.id)
			.select('-_id')
			.select('-password')
			.select('-activationKey')
			.select('-updatedAt')
			.select('-__v');
		if(user){
			return res.json({ user });
		}
		return res.json({ msg: messages.USER_NOT_FOUND });
	} catch {
		return res.status(500).send(messages.SERVER_ERROR);
	}
};

export const getUserList = async (req: Request, res: Response) => {
	try {
		const userList = await User.find()
			.select('-password')
			.select('-activationKey')
			.select('-updatedAt')
			.select('-__v');
		if(userList){
			return res.json({ userList });
		}
		return res.json({ msg: messages.USERS_NOT_FOUND });
	} catch {
		return res.status(500).send(messages.SERVER_ERROR);
	}
};

export const addUser = async (req: Request, res: Response) => {
	const {
		// @ts-ignore
		email = email.toLowerCase(),
		password
	} = req.body;

	try {
		const user = await User.findOne({ email });
		if (user) {
			return res
				.status(400)
				.json({ errors: [{ msg: messages.EMAIL_ALREADY_EXISTS }] });
		} else {
			const newUser = new User(req.body);
			newUser.email = email;
			newUser.password = bcrypt.hashSync(password);
		
			await newUser.save();
			return res.json({ msg: messages.USER_ADDED });
		};
	} catch (err) {
		return res.status(500).send(messages.SERVER_ERROR);
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const {
		firstName,
		lastName,
		// @ts-ignore
		email = email.toLowerCase(),
		password
	} = req.body;

    try {
		const user = await User.findOne({ email })
		if (user) {
			return res
				.status(400)
				.json({ errors: [{ msg: messages.EMAIL_ALREADY_EXISTS }] });
		} else {
			const newUser = new User({
				firstName,
				lastName,
				email,
				password: bcrypt.hashSync(password),
				activationKey: bcrypt.hashSync(email).replace(/\//g, '')
			});

			const user = await newUser.save();
			sendVerificationEmail(user);
			signJwtToken(res, user, 3600, messages.USER_REGISTERED);
		}; 
	} catch {
		return res.status(500).send(messages.SERVER_ERROR)
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const {
		password,
		// @ts-ignore
		email = email.toLowerCase(),
		remember
	} = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ errors: [{ msg: messages.INVALID_CREDENTIALS }] });
		} else {
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				const expiresIn = remember ? 43200 : 3600;
				signJwtToken(res, user, expiresIn, messages.USER_LOGGEDIN);
			} else {
				return res
					.status(400)
					.json({ errors: [{ msg: messages.INVALID_CREDENTIALS }] });
			}
		}
	} catch {
		return res.status(500).send(messages.SERVER_ERROR);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findOneAndRemove({ _id: req.user.id });
		if(user){
			return res.json({ msg: messages.USER_DELETED });
		}
		return res.json({ msg: messages.USERS_NOT_FOUND });
	} catch {
		return res.status(500).send(messages.SERVER_ERROR);
	}
};

export const updateUserData = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.user.id);
		if (user) {
			const { firstName, lastName, password, emailVerified, roles } = req.body;
			let { email } = req.body;

			if (firstName) user.firstName = firstName;
			if (lastName) user.lastName = lastName;

			if(req.user.admin){
				if (emailVerified) user.emailVerified = emailVerified;
				if (roles) user.roles = roles;
			}

			if (email) {
				email = email.toLowerCase();
				if (email !== user.email) {
					const emailExist = await User.findOne({ email });
					if (emailExist) {
						return res
							.status(400)
							.json({ errors: [{ msg: messages.EMAIL_ALREADY_EXISTS }] });
					}
					user.email = email;
					if(!req.user.admin){
						user.activationKey = bcrypt.hashSync(email).replace(/\//g, '');
						user.emailVerified = false;
						sendVerificationEmail(user);
					}
				}
			}
			if (password) {
				user.password = bcrypt.hashSync(password);
			}
			await user.save();
			return res.json({ msg: messages.USER_UPDATED });
		}
		return res.json({ msg: messages.USER_NOT_FOUND });
	} catch {
		return res.status(500).send(messages.SERVER_ERROR);
	}
};

interface ITransporterAuth {
	user: string;
	pass: string;
}
const sendVerificationEmail = (user: IUser) => {
	const mailSettings: TransportOptions = config.get('mail.settings');
	const mailCredentials: ITransporterAuth = { 
		user: process.env.MAIL_USER || config.get('mail.credentials.user'), 
		pass: process.env.MAIL_PASS || config.get('mail.credentials.pass') 
	}
	const transporter = nodemailer.createTransport({
		...mailSettings,
		auth: mailCredentials
	});

	const mailOptions = {
		from: 'support <natripareact@gmail.com>',
		to: user.email,
		subject: 'Account Activation',
		html: `
      To activate your account, click this link
      <a href="http://localhost:5000/api/users/activate/${
				user.activationKey
			}">Activate Account</a>
    `
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) throw err;
	});
};
