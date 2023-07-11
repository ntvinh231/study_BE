import Customer from '../models/Customer.js';
import apq from 'api-query-params';

export const createCustomerService = async (customerData) => {
	try {
		let result = Customer.create({
			...(customerData || ''),
		});
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const createArrayCustomerService = async (Arr) => {
	try {
		let result = await Customer.insertMany(Arr); //sau khi them vào mongoose sẽ trả về data đã thêm
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getAllCustomerService = async (limit, page, name, queryString) => {
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
			const { filter, sort, projection } = apq(queryString);
			delete filter.page;
			result = await Customer.find(filter).skip(parseInt(offset)).limit(limit).sort(sort).select(projection).exec();
		} else result = await Customer.find({});
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const putUpdateCustomerService = async (id, name, address, phone, email, image, description) => {
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
};

export const deleteACustomerService = async (id) => {
	try {
		let result = await Customer.deleteById(id);
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const deleteArrayCustomersService = async (arrId) => {
	try {
		let result = await Customer.delete({ id: { $in: arrId } });
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};
