import express from 'express';
import {
	getUsersAPI,
	postCreateUserAPI,
	putUpdateUserAPI,
	DeleteUserAPI,
	postUploadSingleFileAPI,
	postUploadMultipleFilesAPI,
	checkBodyMiddleware,
} from '../controllers/apiController.js';

import {
	postCreateCustomer,
	postCreateArrayCustomer,
	getAllCustomers,
	putUpdateCustomer,
	deleteACustomer,
	deleteArrayCustomer,
} from '../controllers/customerController.js';

import { handleProject, getAllProject, deleteProject, updateProject } from '../controllers/projectController.js';

import { handleTask, getAllTask, updateTask, deleteTask } from '../controllers/taskController.js';

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
import checkAuth from '../middleware/checkAuth.js';

routerAPI.post('/project', handleProject);
routerAPI.get('/project', checkAuth, getAllProject);
routerAPI.delete('/project', deleteProject);
routerAPI.put('/project', updateProject);

//------------ Task ---------------
routerAPI.post('/task', handleTask);
routerAPI.get('/task', getAllTask);
routerAPI.put('/task', updateTask);
routerAPI.delete('/task', deleteTask);

import { signUp, signIn } from '../controllers/authController.js';

// Authencation
routerAPI.post('/signup', signUp);
routerAPI.post('/signin', signIn);

export default routerAPI; //export default
