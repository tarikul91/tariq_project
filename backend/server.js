const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path')
const errorHandler = require("./config/error")
const port = process.env.PORT || 5000;
const morgan = require('morgan')
require('dotenv').config();

//db
const uri = process.env.DB_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
})

//setup
const app = express();
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('tiny'))
}
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//routes
const usersRouter = require('./route/user');
const postRouter = require('./route/post');

app.use('/api/v1/user', usersRouter);
app.use('/api/v1/post', postRouter);

//error handling
app.use(function (req, res, next) {
	let err = new Error('Page Not Found');
	err.status = 404;
	next(err);
});
//middleware for error handler
app.use(errorHandler);
//handle unhandled promise
process.on("unhandledRejection", (err, promise) => {
	console.log(`Unhandle Error: ${err.message}`);
	//close server & exit
	//app.close(() => process.exit(1));
});
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
})