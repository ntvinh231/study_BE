import User from '../models/User.js';
import httpError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sendEmail from '../util/sendEmail.js';
import crypto from 'crypto';

const signInToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

export const signUp = async (req, res, next) => {
	try {
		const newUser = await User.create(req.body);

		res.status(201).json({
			status: 201,
			message: 'Registered successfully!',
			data: newUser,
		});
	} catch (error) {
		console.log(error);
		return next(httpError(500, error));
	}
};

export const signIn = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		//1. check if email and password exist
		if (!email || !password) return next(httpError(400, 'Email & Password is required!'));
		//2. check if user exists & password is correct
		const user = await User.findOne({ email }).select('+password');
		if (!user || !(await bcrypt.compare(password, user.password)))
			return next(httpError(401, 'Incorrect email or password'));
		const token = signInToken(user._id);
		//3. if everything ok, send token to client
		res.status(200).json({
			status: 201,
			message: 'Logged in successfully!',
			token,
		});
	} catch (error) {
		console.log(error);
	}
};

export const forgotPassword = async (req, res, next) => {
	try {
		//1. Get user based on POSTed email
		const user = await User.findOne({ email: req.body.email });
		if (!user) return next(httpError(404, 'There is no user with email address'));
		user.save({ validateBeforeSave: false });

		//2. Generate the random reset token

		const resetToken = await user.createPasswordResetToken();
		//3. Send it to user's email
		const resetURL = `${req.protocol}://${req.get('host')}${process.env.URL_VERSION}/resetPassword/${resetToken}`;
		const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIF you didn't forget your password, please ignore this email`;
		try {
			await sendEmail({
				email: req.body.email,
				subject: 'Your password reset token(valid for 10 min)',
				message,
			});
			//Tokens will be deleted after 10 minutes
			setTimeout(() => {
				user.passwordResetToken = undefined;
				user.passwordResetExpires = undefined;
				user.save({ validateBeforeSave: false });
			}, 1000 * 60 * 10);

			res.status(200).json({
				status: 'sucess',
				message: 'Token sent to email!',
			});
		} catch (error) {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			user.save({ validateBeforeSave: false });
			console.log(error);
			return next(httpError(500, 'There was an error sending the email. Try again later'));
		}
	} catch (error) {
		console.log(error);
		return next(httpError(500));
	}
};

export const resetPassword = async (req, res, next) => {
	try {
		//1. Get user based on the token
		const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

		const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
		//2. If token has not expired, and there is user, set the new password
		if (!user) return next(httpError(400, 'Token is invalid or expired'));
		user.password = req.body.password;
		user.passwordConfirm = req.body.passwordConfirm;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save();
		//3. Update changedPasswordAt property for the user
		//4. Log the user in, send JWT
		const token = signInToken(user._id);
		res.status(200).json({
			status: 'sucess',
			token,
		});
	} catch (error) {
		console.log(error);
		return next(httpError(500, error));
	}
};
