// init code
const router = require('express').Router();
const bodyParser = require('body-parser');
const File = require('./../models/file');
const FolderFile = require('./../models/folder_file');


// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


// routes
router.get('/', async (req,res) =>{
	try{
		const user_id = req.query.user_id;
		const response = await File.find({user_id:user_id});
		if(response.length>0){
			return res.status(200).json({
				status:true,
				message:"Files result",
				data:response
			});
		}else{
			return res.status(200).json({
				status:true,
				message:"No Records Found"
			});
		}
	}catch(err){
		return res.status(500).json({
			status:false,
			message:"Error: File result fetching error",
			error:err
		});
	}
});

router.post("/create-new-file", async (req,res)=>{
	const {file_name,content,folder_id,user_id} = req.body;
	let fileresult, filefolderresult ;
	if(typeof folder_id != 'undefined'){
		fileresult = await File.create({file_name, content, user_id, isInFolder:true});
		filefolderresult = await FolderFile.create({folder_id:folder_id, file_id:fileresult._id});
		fileresult={
			file:fileresult,
			folder_file:filefolderresult
		}
	}else{
		fileresult = await File.create({file_name, content, user_id});
	}
		
	if(fileresult){
		return res.status(200).json({
			status:true,
			message:"File created successfully",
			data:fileresult
		});
	}
});


module.exports = router;