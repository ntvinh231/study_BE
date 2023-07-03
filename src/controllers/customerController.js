const apq = require('api-query-params');
const Joi = require('joi');
const {
	createCustomerService,
	createArrayCustomerService,
	getAllCustomerService,
	putUpdateCustomerService,
	deleteACustomerService,
} = require('../services/customerService');
const { uploadSingleFile } = require('../services/filesService');

module.exports = {
	postCreateCustomer: async (req, res) => {
		let { name, address, phone, email, description } = req.body;
		const schema = Joi.object({
			name: Joi.string().alphanum().min(3).max(30).required(),
			address: Joi.string(),
			phone: Joi.string().pattern(new RegExp('^[0-9]{8,12}$')),
			email: Joi.string().email(),
			description: Joi.string(),
		});
		const { error } = schema.validate(req.body, { abortEarly: false });
		if (error) {
			return res.status(200).json({
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
				image: imgUrl,
			};
			let customer = await createCustomerService(customerData);
			return res.status(200).json({
				EC: 0,
				data: customer,
			});
		}
	},

	postCreateArrayCustomer: async (req, res) => {
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
	},
	getAllCustomers: async (req, res) => {
		let result = null;
		let { limit, page, name } = req.query;
		if (limit && page) {
			result = await getAllCustomerService(limit, page, name, req.query);
		} else {
			result = await getAllCustomerService();
		}
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
	},
	putUpdateCustomer: async (req, res) => {
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
	},

	deleteACustomer: async (req, res) => {
		let id = req.body.id;
		let result = await deleteACustomerService(id);
		res.status(200).json({
			errorCode: 0,
			data: result,
		});
	},

	deleteArrayCustomer: async (req, res) => {
		let arr = req.body.customers;
		let result = await deleteACustomerService(arr);
		res.status(200).json({
			errorCode: 0,
			data: result,
		});
	},
};
