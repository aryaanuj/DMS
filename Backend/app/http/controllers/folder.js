// init code
const router = require('express').Router();
const bodyParser = require('body-parser');
const Folder = require('./../models/folder');
const Authentication = require('./../middlewares/Authentication');


// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


// routes
router.get('/', Authentication, async (req,res) =>{
	try{
		const user_id = req.query.user_id;
		const response = await Folder.find({user_id:user_id});
		if(response.length>0){
			return res.status(200).json({
				status:true,
				message:"Folder result",
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
			message:"Error: Folder result fetching error",
			error:err
		});
	}
});

router.post("/create-new-folder", async (req,res)=>{
	const {folder_name, user_id} = req.body;
	const result = await Folder.create({folder_name, user_id});
	if(result){
		return res.status(200).json({
			status:true,
			message:"Folder created successfully",
			data:result
		});
	}
});


module.exports = router;