const path = require('path');
// Array of allowed files
const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif'];
const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
const uploadSingleFile = async (fileObject) => {
	let mimetype = fileObject.mimetype;
	let ext_name = path.extname(fileObject.name);
	let base_name = path.basename(fileObject.name, ext_name);
	let file_name = `${base_name}-${Date.now()}${ext_name}`;
	let uploadPath = path.resolve(__dirname, '../public/images/upload/' + `${file_name}`);
	//save => public/images/upload
	//abc.png => abc-timestamp.png
	//upload multiple files
	try {
		if (array_of_allowed_files.includes(ext_name) || array_of_allowed_file_types.includes(mimetype)) {
			await fileObject.mv(uploadPath);
			return {
				status: 'sucess',
				path: file_name,
				fileName: fileObject.name,
				error: null,
			};
		} else throw Error('Invalid file');
	} catch (err) {
		return {
			status: 'failed',
			path: null,
			error: JSON.stringify(err.message),
		};
	}
};

const uploadMultipleFiles = async (fileArray) => {
	let resultArr = []; //Là array trả về json một mảng
	let countSucess = 0;
	for (let i = 0; i < fileArray.length; i++) {
		let mimetype = fileArray[i].mimetype;
		let ext_name = path.extname(fileArray[i].name);
		let base_name = path.basename(fileArray[i].name, ext_name);
		let file_name = `${base_name}-${Date.now()}${ext_name}`;
		let uploadPath = path.resolve(__dirname, '../public/images/upload/' + `${file_name}`);
		try {
			if (array_of_allowed_files.includes(ext_name) || array_of_allowed_file_types.includes(mimetype)) {
				await fileArray[i].mv(uploadPath);
				resultArr.push({
					status: 'sucess',
					path: file_name,
					fileName: fileArray[i].name,
					error: null,
				});
				countSucess++;
			} else throw Error('Invalid file');
		} catch (err) {
			resultArr.push({
				status: 'failed',
				path: null,
				fileName: fileArray[i].name,
				error: JSON.stringify(err.message),
			});
		}
	}
	return {
		countSucess,
		detail: resultArr,
	};
};

module.exports = {
	uploadSingleFile,
	uploadMultipleFiles,
};
