import httpError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkAuth = async (req, res, next) => {
	try {
		//1. Get token and check of it's there
		const token = req.header('Authorization')?.split('Bearer ')[1];
		if (!token) throw 'You are not logged in! Please log in  to get access';
		//2. Verification token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		//3. Check if user still exists
		const currentUser = await User.findById(decoded.id);
		if (!currentUser) throw 'The user belonging to this does no longer exists';
		if (currentUser.changedPasswordAfter(decoded.iat)) throw 'User recently changed password! Please log in again';
		//4. Check if user changed password after JWT was issued
		req.user = currentUser;
		next();
	} catch (error) {
		return next(httpError(401, error));
	}
};

export default checkAuth;
