const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		emailVerified: {
			type: Boolean,
			default: false
		},
		activationKey: {
			type: String
		},
		roles: [String]
	},
	{ timestamps: true }
);

const User = mongoose.model('users', UserSchema);

module.exports = User;
