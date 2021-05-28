require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
require('./database/db');
const userController = require('./controller/user');

app.use(morgan('dev'));
app.use(cors());

app.all('/', (req,res)=>{
	return res.send("hello");
});


app.listen(port, (req,res)=>{
	console.log("Server is running");
})



// database connection
const mongoose = require('mongoose');
const assert = require('assert');

mongoose.connect(dburl, {
	useNewUrlParser:true,
	useUnifiedTopology:true,
	useCreateIndex:true
}, (err,link)=>{
	assert(err,null,"Db connection failed");
	console.log('db connection successfully');
});


// model
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	username:{
		type:String,
		required:true;
	},
	email:{
		type:String,
		required:true
	}
});

const model = mongoose.model('users', UserSchema);
module.exports = model;


// controller
const express = require('express');
const router = express.Router();
const User = require("./model/user");

router.all("/", async (req,res)=>{
	try{
		const data = await User.findOne({});
		if(!data){
			console.log("not found");
			return;
		}
		return res.status(200).json({
			data:data
		});

	}catch(err){
		console.log(err);
	}
});


module.exports = router;

























