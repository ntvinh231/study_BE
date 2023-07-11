import express from 'express';
import {
	getHomePage,
	getCreatePage,
	postCreateUser,
	getUpdatePage,
	postUpdateUser,
	postDeleteUserPage,
	postDeleteUser,
} from '../controllers/homeController.js';
const router = express.Router();

//Route.Method('/route/, handler) để sử lý với MVC
router.get('/', getHomePage);
router.get('/create', getCreatePage);
router.post('/update', getUpdatePage);
router.post('/delete', postDeleteUserPage);

router.post('/create-user', postCreateUser);
router.post('/update-user', postUpdateUser);
router.post('/delete-user/', postDeleteUser);
// chưa chia theo MVC
router.get('/vinh', (req, res) => {
	// res.send('Hello Vinh');
	res.render('sample.ejs');
});

export default router; //export default
