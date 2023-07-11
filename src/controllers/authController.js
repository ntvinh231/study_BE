import User from '../models/User.js';
import httpError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
