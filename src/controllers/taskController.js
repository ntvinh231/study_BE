import { handleServiceTask, getAllTaskService, updateDateService, deleteTaskService } from '../services/taskService.js';

export const handleTask = async (req, res) => {
	let result = await handleServiceTask(req.body);
	return res.status(200).json({
		errorCode: 0,
		data: result,
	});
};
export const getAllTask = async (req, res) => {
	let result = await getAllTaskService(req.body);
	return res.status(200).json({
		errorCode: 0,
		data: result,
	});
};
export const updateTask = async (req, res) => {
	let result = await updateDateService(req.body);
	return res.status(200).json({
		errorCode: 0,
		data: result,
	});
};
export const deleteTask = async (req, res) => {
	let result = await deleteTaskService(req.body.id);
	return res.status(200).json({
		errorCode: 0,
		data: result,
	});
};
