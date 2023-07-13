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
import { signUp, signIn, forgotPassword, resetPassword } from '../controllers/authController.js';

const routerAPI = express.Router();

routerAPI.get(process.env.URL_ROUTE_USER, getUsersAPI);
routerAPI.post(process.env.URL_ROUTE_USER, checkBodyMiddleware, postCreateUserAPI);
routerAPI.put(process.env.URL_ROUTE_USER, putUpdateUserAPI);
routerAPI.delete(process.env.URL_ROUTE_USER, DeleteUserAPI);
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
import restricTo from '../middleware/checkRole.js';

routerAPI.post('/project', handleProject);
routerAPI.get('/project', checkAuth, restricTo('admin', 'lead'), getAllProject);
routerAPI.delete('/project', checkAuth, restricTo('admin', 'lead'), deleteProject);
routerAPI.put('/project', updateProject);

//------------ Task ---------------
routerAPI.post('/task', handleTask);
routerAPI.get('/task', getAllTask);
routerAPI.put('/task', updateTask);
routerAPI.delete('/task', deleteTask);

// Authencation
routerAPI.post('/signup', signUp);
routerAPI.post('/signin', signIn);
routerAPI.post('/forgotPassword', forgotPassword);
routerAPI.patch('/resetPassword/:token', resetPassword);
export default routerAPI; //export default
