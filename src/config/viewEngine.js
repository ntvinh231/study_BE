import path from 'path';
import express from 'express';
const configViewEngine = (app) => {
	//khi truy cập tên file có trong views hoặc public
	//tự hiểu là tìm đến views hoặc public không cần trỏ vào
	app.set('views', path.join('./src', 'views'));
	app.set('view engine', 'ejs');
	//config static files
	app.use(express.static(path.join('./src', 'public')));
};

export default configViewEngine;
