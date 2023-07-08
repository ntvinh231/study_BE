const express = require('express');
const {
	getUsersAPI,
	postCreateUserAPI,
	putUpdateUserAPI,
	DeleteUserAPI,
	postUploadSingleFileAPI,
	postUploadMultipleFilesAPI,
	checkBodyMiddleware,
} = require('../controllers/apiController');

const {
	postCreateCustomer,
	postCreateArrayCustomer,
	getAllCustomers,
	putUpdateCustomer,
	deleteACustomer,
	deleteArrayCustomer,
} = require('../controllers/customerController');

const { handleProject, getAllProject, deleteProject, updateProject } = require('../controllers/projectController');

const { handleTask, getAllTask, updateTask, deleteTask } = require('../controllers/taskController');

const routerAPI = express.Router();

routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', checkBodyMiddleware, postCreateUserAPI);
routerAPI.put('/users', putUpdateUserAPI);
routerAPI.delete('/users', DeleteUserAPI);
//upload file
routerAPI.post('/file', postUploadSingleFileAPI);
routerAPI.post('/files', postUploadMultipleFilesAPI);
//customer
routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/customers-many', postCreateArrayCustomer);
routerAPI.get('/customers', getAllCustomers);
routerAPI.put('/customers', putUpdateCustomer);
routerAPI.delete('/customers', deleteACustomer);
routerAPI.delete('/customers-many', deleteArrayCustomer);
// info req.query
routerAPI.get('/info', (req, res) => {
	res.send(req.query);
});
// info req.params
routerAPI.get('/info/:name/:address', (req, res) => {
	res.send(req.params);
});

//------------ Project ---------------
routerAPI.post('/project', handleProject);
routerAPI.get('/project', getAllProject);
routerAPI.delete('/project', deleteProject);
routerAPI.put('/project', updateProject);

//------------ Task ---------------
routerAPI.post('/task', handleTask);
routerAPI.get('/task', getAllTask);
routerAPI.put('/task', updateTask);
routerAPI.delete('/task', deleteTask);

module.exports = routerAPI; //export default
