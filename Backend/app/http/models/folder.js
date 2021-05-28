const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const folderSchema = mongoose.Schema({
	folder_name:{
		type:String,
		required:true
	},
	user_id:{
		type:String,
		required:true,
		user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	}
});

Folder = mongoose.model('folders', folderSchema);

module.exports = Folder;