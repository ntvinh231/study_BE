const { default: aqp } = require('api-query-params');
const Task = require('../models/Task');

module.exports = {
	handleServiceTask: async (task) => {
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
	},
	getAllTaskService: async (queryString) => {
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
	},
	updateDateService: async (task) => {
		try {
			let result = null;
			// let { id, name, description, status, startDate, endDate } = task;
			result = await Task.updateOne({ _id: task.id }, { ...task });
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	deleteTaskService: async (id) => {
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
	},
};
