import apq from 'api-query-params';
import Joi from 'joi';
import {
	createCustomerService,
	createArrayCustomerService,
	getAllCustomerService,
	putUpdateCustomerService,
	deleteACustomerService,
} from '../services/customerService.js';
import { uploadSingleFile } from '../services/filesService.js';

export const postCreateCustomer = async (req, res) => {
	let { name, address, phone, email, description, age, secretCustomer } = req.body;
	const schema = Joi.object({
		name: Joi.string().alphanum().min(3).max(30).required(),
		address: Joi.string(),
		phone: Joi.string().pattern(new RegExp('^[0-9]{8,12}$')),
		email: Joi.string().email(),
		description: Joi.string(),
		age: Joi.number(),
		secretCustomer: Joi.boolean(),
	});
	const { error } = schema.validate(req.body, { abortEarly: false });
	if (error) {
		return res.status(404).json({
			status: 'failed',
			msg: error,
		});
	} else {
		let imgUrl = '';
		if (!req.files || Object.keys(req.files).length == 0) {
			//do nothong
		} else {
			let result = await uploadSingleFile(req.files.image);
			imgUrl = result.path;
		}
		let customerData = {
			name,
			address,
			phone,
			email,
			description,
			age,
			secretCustomer,
			image: imgUrl,
		};
		let customer = await createCustomerService(customerData);
		return res.status(200).json({
			EC: 0,
			data: customer,
		});
	}
};

export const postCreateArrayCustomer = async (req, res) => {
	let customers = await createArrayCustomerService(req.body.customers);
	if (customers) {
		res.status(200).json({
			errorCode: 0,
			data: customers,
		});
	} else {
		res.status(400).json({
			errorCode: -1,
			data: 'Name is required',
		});
	}
};

export const getAllCustomers = async (req, res) => {
	let result = null;
	let { limit, page, name } = req.query;
	if (req.query) {
		result = await getAllCustomerService(limit, page, name, req.query);
	} else {
		result = await getAllCustomerService();
	}
	if (result) {
		res.status(200).json({
			errorCode: 0,
			result: result.length,
			data: result,
		});
	} else {
		res.status(400).json({
			errorCode: -1,
			data: null,
		});
	}
};
export const putUpdateCustomer = async (req, res) => {
	let { id, name, address, phone, email, image, description } = req.body;
	let result = await putUpdateCustomerService(id, name, address, phone, email, image, description);
	if (result) {
		res.status(200).json({
			errorCode: 0,
			data: result,
		});
	} else {
		res.status(400).json({
			errorCode: -1,
			data: null,
		});
	}
};
export const deleteACustomer = async (req, res) => {
	let id = req.body.id;
	let result = await deleteACustomerService(id);
	res.status(200).json({
		errorCode: 0,
		data: result,
	});
};

export const deleteArrayCustomer = async (req, res) => {
	let arr = req.body.customers;
	let result = await deleteACustomerService(arr);
	res.status(200).json({
		errorCode: 0,
		data: result,
	});
};
