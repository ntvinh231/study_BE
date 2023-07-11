import dotenv from 'dotenv';
import express from 'express';
import configViewEngine from './config/viewEngine.js';
import webRoutes from './routes/web.js';
import apiRoutes from './routes/api.js';
import connection from './config/database.js';
import fileUpload from 'express-fileupload';
import { MongoClient } from 'mongodb';
import AppError from './util/appError.js';
import globalErrorHandle from './util/handleError.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
//config file upload
app.use(fileUpload({ createParentPath: true }));
//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config template engine
configViewEngine(app);

//khai báo route
app.use('/', webRoutes); // / là route mặc dịnh
app.use('/v1/api', apiRoutes); //tiền tố đầu tiên sẽ đúng sau đường link khai báo

// Check route
app.all('*', (req, res, next) => {
	// res.status(404).json({
	// 	status: 'failed',
	// 	message: `Can't find ${req.originalUrl} on this server`,
	// });
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandle);

(async () => {
	try {
		// test connection
		await connection();

		// // Using mongodb driver
		// const url = process.env.DB_HOST_WITH_DRIVER;
		// const dbName = process.env.DB_NAME;
		// const client = new MongoClient(url);
		// await client.connect();
		// console.log('Connected successfully to server');
		// const db = client.db(dbName);
		// const collection = db.collection('documents');
		app.listen(port, hostname, () => {
			console.log('ok port', port);
		});
	} catch (error) {
		console.log('>>>Error connec to DB:', error);
	}
})();
