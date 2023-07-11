import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
//shape data
const userSchema = new mongoose.Schema({
	name: { type: String, required: [true, 'Please tell us your name'] },
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	city: String,
	photo: String,
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minLength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: 'Password are not the same!',
		},
	},
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});
const User = mongoose.model('User', userSchema);

export default User;
