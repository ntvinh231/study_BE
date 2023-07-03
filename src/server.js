require('dotenv').config();
const express = require('express');
const configViewEngine = require('./src/config/viewEngine');
const webRoutes = require('./src/routes/web');
const apiRoutes = require('./src/routes/api');
const connection = require('./src/config/database');
const fileUpload = require('express-fileupload');
const { MongoClient } = require('mongodb');
const app = express();
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
