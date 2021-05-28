// init code
const router = require('express').Router();
const bodyParser = require('body-parser');
const File = require('./../models/file');
const Authentication = require('./../middlewares/Authentication');


// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


// routes
router.get('/',Authentication, async (req,res) =>{
	try{
		const user_id = req.query.user_id;
		
			response =  await File.find({user_id:user_id, isInFolder:false});
		
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


router.get('/fileById',Authentication, async (req,res) =>{
	try{
		const user_id = req.query.user_id;
		const fileid = req.query.fileid;
		response = await File.find({_id:fileid, user_id:user_id, isInFolder:false});
		
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


router.get('/fileByFolder',Authentication, async (req,res) =>{
	try{
		const folderid = req.query.folderid;
		const response = await File.find({isInFolder:true,folder_id:folderid});
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

router.post("/create-new-file",Authentication, async (req,res)=>{
	const {file_name,content,folder_id, user_id} = req.body;

	var fileresult;
	if(typeof folder_id != "undefined"){
		// res.json({
		// 	ins:"inside"
		// });
		fileresult = await File.create({file_name, content, user_id, folder_id,isInFolder:true }
			).catch((err)=>{
			res.json({
				error:err
			});
		});

	}else{
		fileresult = await File.create({file_name, content, user_id}).catch((err)=>{
			res.json({
				error:err	
			});
		 });
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