const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService');
const User = require('../models/User');

const getHomePage = async (req, res) => {
	let results = await User.find({});
	res.render('home.ejs', {
		listUsers: results,
	});
};

const getCreatePage = (req, res) => {
	return res.render('create.ejs');
};

const postCreateUser = async (req, res) => {
	// let email = req.body.email;
	// let name = req.body.name;
	// let city = req.body.city;
	let { email, name, city } = req.body;

	await User.create({
		email,
		name,
		city,
	}); //khi khống có key thì sẽ lấy chính nó làm key
	res.redirect('/');
};

const getUpdatePage = async (req, res) => {
	const userId = req.body.idUpdate;
	let user = await User.findById(userId).exec();
	return res.render('update.ejs', { user: user });
};

const postUpdateUser = async (req, res) => {
	let { id, email, name, city } = await req.body;
	await User.updateOne({ _id: id }, { email, name, city });
	res.redirect('/');
};

const postDeleteUserPage = async (req, res) => {
	let { idDelete } = await req.body;
	console.log(idDelete);
	let user = await User.findById(idDelete).exec();
	res.render('delete.ejs', { user: user });
};

const postDeleteUser = async (req, res) => {
	let { id } = await req.body;
	await User.deleteOne({ _id: id });
	res.redirect('/');
};
module.exports = {
	getHomePage,
	postCreateUser,
	getCreatePage,
	getUpdatePage,
	postUpdateUser,
	postDeleteUserPage,
	postDeleteUser,
};
