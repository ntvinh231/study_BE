const Project = require('../models/Project');
const apq = require('api-query-params');
module.exports = {
	handleProjectService: async (project) => {
		try {
			let newResult = 'Project_id does not exits';
			if (project.type === 'EMPTY-PROJECT') {
				let data = await Project.create(project);
				return data;
			}
			if (project.type === 'ADD-USER') {
				let myProject = await Project.findById(project.projectId).exec();
				if (myProject) {
					for (let i = 0; i < project.userArr.length; i++) {
						if (!myProject.usersInfor.includes(project.userArr[i])) {
							myProject.usersInfor.push(project.userArr[i]);
						}
					}
					newResult = await myProject.save();
				}
				return newResult;
			}
			if (project.type === 'REMOVE-USER') {
				let myProject = await Project.findById(project.projectId).exec();
				if (myProject) {
					for (let i = 0; i < project.userArr.length; i++) {
						myProject.usersInfor.pull(project.userArr[i]);
					}
					newResult = await myProject.save();
				}
				return newResult;
			}
			if (project.type === 'ADD-TASKS') {
				let myProject = await Project.findById({ _id: project.projectId });
				if (myProject) {
					for (let i = 0; i < project.taskArr.length; i++) {
						if (!myProject.tasks.includes(project.taskArr[i])) {
							myProject.tasks.push(project.taskArr[i]);
						}
					}
					newResult = await myProject.save();
				}
				return newResult;
			}
			if (project.type === 'REMOVE-TASKS') {
				let myProject = await Project.findById(project.projectId).exec();
				if (myProject) {
					for (let i = 0; i < project.taskArr.length; i++) {
						myProject.tasks.pull(project.taskArr[i]);
					}
					newResult = await myProject.save();
				}
				return newResult;
			}
		} catch (error) {
			console.log(error);
			return error.message;
		}
	},

	getAllProjectService: async (queryString) => {
		const page = queryString.page;
		let { filter, limit, population } = apq(queryString);
		delete filter.page;
		let offset = (page - 1) * limit;

		let result = Project.find(filter).populate(population).limit(limit).skip(offset).exec();
		return result;
	},

	deleteProjectService: async (id) => {
		let result = null;
		try {
			if (Array.isArray(id)) {
				result = await Project.delete({ _id: { $in: id } });
			} else {
				result = await Project.deleteById({ _id: id });
			}
			return result;
		} catch (error) {
			console.log(error);
			return error;
		}
	},

	updateProjectService: async (id, name, endDate, description) => {
		try {
			let result = await Project.updateOne({ _id: id }, { name, endDate, description });
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
