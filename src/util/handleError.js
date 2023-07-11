const globalErrorHandle = (err, req, res, next) => {
	err.status = err.status || 'error';
	err.statusCode = err.statusCode || 500;
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
};

export default globalErrorHandle;
