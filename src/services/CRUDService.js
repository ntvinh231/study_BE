const connection = require('../config/database');
const getAllUsers = async () => {
	let [results, fields] = await connection.query('Select * from Users u');
	return results;
};

const getUserById = async (id) => {
	let [results, fields] = await connection.query('Select * from Users where id = ?', [id]);
	//kiểm tra có biến results không nếu có results thì tiếp tục kiểm tra results > 0 nếu thỏa thì lấy result đầu tiên
	return results && results.length > 0 ? results[0] : {};
};

const updateUserById = async (id, email, name, city) => {
	let [results, fields] = await connection.query('Update Users SET email = ?, name = ?, city = ? WHERE id = ?', [
		email,
		name,
		city,
		id,
	]);
};

const deleteUserById = async (idDelete) => {
	let [results, fields] = await connection.query('DELETE FROM Users WHERE id= ?', [idDelete]);
};

module.exports = {
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
};
