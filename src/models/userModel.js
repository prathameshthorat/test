import mongoose from 'mongoose';

const User = mongoose.Schema;

export const UserSchema = new User({
	userName: {
		type: String,
		required: 'Username cannot be empty'
	},
	password: {
		type: String,
		required: 'Password cannot be empty'
	}
})
