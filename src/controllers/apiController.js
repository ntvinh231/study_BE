import User from '../models/User.js';
import { uploadSingleFile, uploadMultipleFiles } from '../services/filesService.js';

export const getUsersAPI = async (req, res) => {
	let results = await User.find({});
	return res.status(200).json({
		errorCode: 0,
		data: results,
	});
};

export const checkBodyMiddleware = async (req, res, next) => {
	if (!req.body.name || !req.body.email) {
		return res.status(404).json({
			errorCode: 0,
			data: 'missing name or email',
		});
	}
	next();
};

export const postCreateUserAPI = async (req, res) => {
	let { email, name, city } = req.body;

	let user = await User.create({
		email,
		name,
		city,
	}); //khi khống có key thì sẽ lấy chính nó làm key
	return res.status(201).json({
		errorCode: 0,
		data: user,
	});
};

export const putUpdateUserAPI = async (req, res) => {
	let { id, email, name, city } = req.body;
	let user = await User.updateOne({ _id: id }, { email, name, city });
	return res.status(200).json({
		errorCode: 0,
		data: user,
	});
};

export const DeleteUserAPI = async (req, res) => {
	let { id } = await req.body;
	let user = await User.deleteOne({ _id: id });
	return res.status(200).json({
		errorCode: 0,
		data: user,
	});
};

export const postUploadSingleFileAPI = async (req, res) => {
	if (!req.files || Object.keys(req.files).length == 0) {
		return res.status(400).send('No files were upload');
	}
	console.log(req.files.image);
	let result = await uploadSingleFile(req.files.image);
	return res.status(200).send({
		errorCode: 0,
		data: result,
	});
};

export const postUploadMultipleFilesAPI = async (req, res) => {
	if (!req.files || Object.keys(req.files).length == 0) {
		return res.status(400).send('No files were upload');
	}
	if (Array.isArray(req.files.image)) {
		let result = await uploadMultipleFiles(req.files.image);
		return res.status(200).send({
			errorCode: 0,
			data: result,
		});
	} else {
		return postUploadSingleFileAPI(req, res);
	}
};
