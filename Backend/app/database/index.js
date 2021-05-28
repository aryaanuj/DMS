// init code
const mongoose = require('mongoose');
const assert = require('assert');
const dbUrl = process.env.DB_URL;


// database connection code
mongoose.connect(dbUrl,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
	useCreateIndex:true
}, (error,link)=>{
	assert.strictEqual(error, null, "DB Connection Failed");
	console.log("DB Connect Success...");
	// console.log(link);
});


