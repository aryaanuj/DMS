// init code
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT;
const database = require('./app/database/index');


// controllers
const userController = require('./app/http/controllers/user');
const folderController = require('./app/http/controllers/folder');
const fileController = require('./app/http/controllers/file');

// middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

// controllers setup
app.use("/api/user/",userController);
app.use("/api/folder/", folderController);
app.use("/api/file/", fileController);

// default routes
app.all("/", (req,res)=>{
	return res.json({
		status:true,
		message:"Welcome to Server"
	});
});


// server listener 
app.listen(port,(req,res)=>{
	console.log("Server is running at port "+port);
});

