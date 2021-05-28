const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;


// schema
const fileSchema = mongoose.Schema({
	file_name:{
		type:String,
		required:true,
		unique:true
	},
	content:{
		type:String,
		required:true
	},
	isInFolder:{
		type:Boolean,
		default:false
	},
	user_id:[{type: Schema.Types.ObjectId, ref: 'User'}]
});

const File = mongoose.model('files', fileSchema);

module.exports = File;