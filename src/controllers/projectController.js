const {
	handleProjectService,
	getAllProjectService,
	deleteProjectService,
	updateProjectService,
} = require('../services/projectService');

module.exports = {
	handleProject: async (req, res) => {
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
	},
	getAllProject: async (req, res) => {
		let result = await getAllProjectService(req.query);
		return res.status(200).json({
			errorCode: 0,
			data: result,
		});
	},

	deleteProject: async (req, res) => {
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
	},

	updateProject: async (req, res) => {
		let { id, name, endDate, description } = req.body;
		let result = await updateProjectService(id, name, endDate, description);
		return res.status(200).json({
			errorCode: 0,
			data: result,
		});
	},
};
