import {
	handleProjectService,
	getAllProjectService,
	deleteProjectService,
	updateProjectService,
} from '../services/projectService.js';

export const handleProject = async (req, res) => {
	let result = await handleProjectService(req.body);
	if (result) {
		return res.status(200).json({
			errorCode: 0,
			data: result,
		});
	} else {
		return res.status(400).json({
			errorCode: -1,
			data: result,
		});
	}
};

export const getAllProject = async (req, res) => {
	let result = await getAllProjectService(req.query);
	return res.status(200).json({
		errorCode: 0,
		result: result.length,
		data: result,
	});
};

export const deleteProject = async (req, res) => {
	let result = null;
	if (req.body.project_id) {
		result = await deleteProjectService(req.body.project_id);
	} else {
		result = await deleteProjectService(req.body.id);
	}
	return res.status(200).json({
		errorCode: 0,
		data: result,
	});
};

export const updateProject = async (req, res) => {
	let { id, name, endDate, description } = req.body;
	let result = await updateProjectService(id, name, endDate, description);
	return res.status(200).json({
		errorCode: 0,
		data: result,
	});
};
