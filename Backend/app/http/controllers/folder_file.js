// init code
const router = require('express').Router();
const bodyParser = require('body-parser');
const FolderFile = require('./../models/folder_file');


// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


// routes
router.get('/', async (req,res) =>{
	try{
		const fid = req.query.fid;
		// res.json({fid:fid});
		const response = await FolderFile.find({folder__id:fid});
		if(response.length>0){
			return res.status(200).json({
				status:true,
				message:"Folder-File result",
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
			message:"Error: Folder-File result fetching error",
			error:err
		});
	}
});


module.exports = router;