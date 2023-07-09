const Customer = require('../models/Customer');
const apq = require('api-query-params');
module.exports = {
	createCustomerService: async (customerData) => {
		try {
			let result = Customer.create({
				name: customerData.name || '',
				address: customerData.address || '',
				phone: customerData.phone || '',
				email: customerData.email || '',
				description: customerData.description || '',
				age: customerData.age || '',
				image: customerData.image || '',
			});
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	createArrayCustomerService: async (Arr) => {
		try {
			let result = await Customer.insertMany(Arr); //sau khi them vào mongoose sẽ trả về data đã thêm
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	getAllCustomerService: async (limit, page, name, queryString) => {
		try {
			let result = null;
			if (queryString) {
				//sử dụng library

				// filter tự viết không dùng library
				// if (name) {
				// 	result = await Customer.find({ name: { $regex: new RegExp(name, 'i') }, address: { $in: ['sai gon'] } })
				// 		.skip(parseInt(offset))
				// 		.limit(limit)
				// 		.exec();
				// } else result = await Customer.find({}).skip(parseInt(offset)).limit(limit).exec();

				let offset = (page - 1) * limit;
				const { filter, sort } = apq(queryString);
				delete filter.page;

				result = await Customer.find(filter).skip(parseInt(offset)).limit(limit).sort(sort).exec();
			} else result = await Customer.find({}).sort(sort);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	putUpdateCustomerService: async (id, name, address, phone, email, image, description) => {
		try {
			await Customer.updateOne({ _id: id }, { name, address, phone, email, image, description });
			return {
				id,
				name,
				address,
				phone,
				email,
				image,
				description,
			};
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	deleteACustomerService: async (id) => {
		try {
			let result = await Customer.deleteById(id);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	deleteArrayCustomersService: async (arrId) => {
		try {
			let result = await Customer.delete({ id: { $in: arrId } });
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
