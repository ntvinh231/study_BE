import aqp from 'api-query-params';
import Task from '../models/Task.js';

export const handleServiceTask = async (task) => {
	try {
		let result = null;
		if (task.type === 'EMPTY-TASK') {
			result = await Task.create(task);
			return result;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getAllTaskService = async (queryString) => {
	try {
		let { filter, limit } = aqp(queryString);
		let offset = (filter.page - 1) * limit;
		delete filter.page;
		result = await Task.find(filter).limit(limit).skip(offset).exec();
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateDateService = async (task) => {
	try {
		let result = null;
		// let { id, name, description, status, startDate, endDate } = task;
		result = await Task.updateOne({ _id: task.id }, { ...task });
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const deleteTaskService = async (id) => {
	try {
		let result = null;
		result = await Task.deleteById({ _id: id });
		if (result.modifiedCount <= 0) {
			result = 'Không tìm thấy Task';
		}
		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};
