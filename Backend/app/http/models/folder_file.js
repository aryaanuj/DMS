const mongoose = require('mongoose');
const Folder = require('./folder');
const File = require('./file');
const Schema = mongoose.Schema;


// schema
const folderfileSchema = mongoose.Schema({
	file_id:[{type: Schema.Types.ObjectId, ref: 'File'}],
	folder_id:[{type: Schema.Types.ObjectId, ref: 'Folder'}]
});

const FolderFile = mongoose.model('folder_files', folderfileSchema);

module.exports = FolderFile;