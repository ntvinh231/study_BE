import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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
	role: {
		type: String,
		enum: ['user', 'guide', 'lead', 'admin'],
		default: 'user',
	},
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
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password') || this.isNew) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	this.passwordChangedAt = Date.now() - 2000;
	next();
});

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');
	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	// const now = new Date();
	// const expries = new Date(now.getTime() + 10 * 60 * 1000);
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	return resetToken;
};

userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
	if (this.passwordChangedAt) {
		console.log(this.passwordChangedAt);
		const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10); //mili seconds / 1000 = second
		return jwtTimeStamp < changedTimeStamp; // Check if user changed password before Log in
	}
	return false;
};

const User = mongoose.model('User', userSchema);

export default User;
