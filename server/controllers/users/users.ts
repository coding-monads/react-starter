import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import messages from '../messages';
import User, { IUser } from '../../models/User';
import nodemailer, {
	TransportOptions,
	Transport,
	Transporter
} from 'nodemailer';
import { Response, Request } from 'express';

export const activateUser = async (req: Request, res: Response) => {
	const { activationKey } = req.params;
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
};

export const registerUser = (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({ errors: errors.array({ onlyFirstError: true }) });
	}

	const {
		firstName,
		lastName,
		// @ts-ignore
		email = email.toLowerCase(),
		password
	} = req.body;

	User.findOne({ email }).then(user => {
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

			newUser
				.save()
				.then(user => {
					const payload = {
						user: {
							id: user.id
						}
					};
					jwt.sign(
						payload,
						config.get('jwtSecret'),
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;
							sendVerificationEmail(newUser);
							res.json({
								msg: messages.USER_REGISTERED,
								token: 'Bearer ' + token
							});
						}
					);
				})
				.catch(() => res.status(500).send(messages.SERVER_ERROR));
		}
	});
};

export const loginUser = (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({ errors: errors.array({ onlyFirstError: true }) });
	}

	const {
		password,
		// @ts-ignore
		email = email.toLowerCase()
	} = req.body;

	User.findOne({ email }).then(user => {
		if (!user) {
			return res
				.status(400)
				.json({ errors: [{ msg: messages.INVALID_CREDENTIALS }] });
		} else {
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					const payload = {
						user: {
							id: user.id
						}
					};

					jwt.sign(
						payload,
						config.get('jwtSecret'),
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;
							res.json({
								msg: messages.USER_LOGGEDIN,
								token: 'Bearer ' + token
							});
						}
					);
				} else {
					return res
						.status(400)
						.json({ errors: [{ msg: messages.INVALID_CREDENTIALS }] });
				}
			});
		}
	});
};

export const deleteUser = (req: Request, res: Response) => {
	User.findOneAndRemove({ _id: req.user.id })
		.then(() => res.json({ msg: messages.USER_DELETED }))
		.catch(() => res.status(500).send(messages.SERVER_ERROR));
};

export const updateUserData = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json({ errors: errors.array({ onlyFirstError: true }) });
	}
	const user = await User.findById(req.user.id);
	if (user) {
		const { firstName, lastName, password } = req.body;
		let { email } = req.body;

		if (firstName) user.firstName = firstName;
		if (lastName) user.lastName = lastName;

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
				user.activationKey = bcrypt.hashSync(email).replace(/\//g, '');
				user.emailVerified = false;
				sendVerificationEmail(user);
			}
		}
		if (password) {
			user.password = bcrypt.hashSync(password);
		}
		await user.save();
		return res.json({ msg: messages.USER_UPDATED });
	} else {
		return res.status(500).send(messages.SERVER_ERROR);
	}
};

interface ITransporterAuth {
	user: string;
	pass: string;
}
const sendVerificationEmail = (user: IUser) => {
	const mailSettings: TransportOptions = config.get('mail.settings');
	const mailCredentials: ITransporterAuth = config.get('mail.credentials');
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
