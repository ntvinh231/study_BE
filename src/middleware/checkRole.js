import httpError from 'http-errors';
import jwt from 'jsonwebtoken';

const restricTo = (...roles) => {
	return (req, res, next) => {
		try {
			if (!roles.includes(req.user.role)) throw 'You do not have permission to perform this action';
			next();
		} catch (error) {
			return next(httpError(403, error));
		}
	};
};

export default restricTo;
