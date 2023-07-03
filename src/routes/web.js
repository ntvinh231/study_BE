const express = require('express');
const {
	getHomePage,
	postCreateUser,
	getCreatePage,
	getUpdatePage,
	postUpdateUser,
	postDeleteUserPage,
	postDeleteUser,
} = require('../controllers/homeController');
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

module.exports = router; //export default
