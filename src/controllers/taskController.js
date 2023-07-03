const {
	handleServiceTask,
	getAllTaskService,
	updateDateService,
	deleteTaskService,
} = require('../services/taskService');

module.exports = {
	handleTask: async (req, res) => {
		let result = await handleServiceTask(req.body);
		return res.status(200).json({
			errorCode: 0,
			data: result,
		});
	},
	getAllTask: async (req, res) => {
		let result = await getAllTaskService(req.body);
		return res.status(200).json({
			errorCode: 0,
			data: result,
		});
	},
	updateTask: async (req, res) => {
		let result = await updateDateService(req.body);
		return res.status(200).json({
			errorCode: 0,
			data: result,
		});
	},
	deleteTask: async (req, res) => {
		let result = await deleteTaskService(req.body.id);
		return res.status(200).json({
			errorCode: 0,
			data: result,
		});
	},
};
