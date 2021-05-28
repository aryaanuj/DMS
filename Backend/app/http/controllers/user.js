// init code
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('./../models/user');
const Authentication = require('./../middlewares/Authentication');


// middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


// routes setup
router.all("/", async (req,res) => {
	try{
		const response = await User.find().sort({createdOn:-1});
		if(response.length>0){
			return res.status(200).json({
				status:true,
				message:"User result",
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
			message:"Error: User result fetching error",
			error:err
		});

	}
	
});


// create new user route
router.post("/register", 
	[
	check('password').not().isEmpty().trim().escape(),
	check('email').isEmail().normalizeEmail()
	], 
	async (req,res) => {

		// check validation errors
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(422).json({
				status:false,
				message:"Form Validation Error",
				error:errors
			});
		}

		// result destructuring
		const {email,password} = req.body;

		// password hashing
		const hashPass = bcrypt.hashSync(password,10);

		try{
			// check if user already exists or not
			const response = await User.findOne({email:email});
			if(response){
				return res.status(422).json({
					status:false,
					message:"User already exist"
				});
			}
			// create new user
			const UserResult = await User.create({email, password:hashPass});

			if(UserResult){
				return res.status(200).json({
					status:true,
					message:"User created successfully",
					data:UserResult
				});
			}
		}catch(err){
			return res.status(500).json({
				status:false,
				message:"User not Created",
				error:err
			});
		}	
	});

router.post('/signin',
	[
	// data senitization
	check("email").isEmail().normalizeEmail(),
	check("password").not().isEmpty().trim().escape()
	], 
	async (req,res) => {
		try{
			// check validation
			const errors = validationResult(req);
			if(!errors.isEmpty()){
				return res.status(422).json({
					status:false,
					message:"Form Validation Error",
					error:errors
				});
			}

			// data destructuring
			const {email,password} = req.body;

			// check if email exists or not
			const user = await User.findOne({email:email});

			if(!user){
				return res.status(400).json({
					status:false,
					message:"Invalid Credentials"
				});
			}

			// verify password
			const verifyPass = await bcrypt.compareSync(password, user.password);

			// if password not verified
			if(!verifyPass){
				return res.status(400).json({
					status:false,
					message:"Invalid Credentials",
				});
			}

			// generate token
			const token = await user.generateAuthToken();

			// if token not generated
			if(!token){
				throw new Error("Internal Server Error");
			}

			// set token in cookie
			res.cookie('jwtoken', token, {
				expires:new Date(Date.now()*29489000000),
				httpOnly:true
			});
			// localStorage.setItem({login:true, token:token});

			return res.status(200).json({
				status:true,
				message:"Signin successfully",
				token:token,
				userid:user._id
			});

		}catch(err){
			return res.status(500).json({
				status:false,
				message:"Internal Server Error",
				error:err
			});
		}
		
	});

router.get('/profile', Authentication, (req,res)=>{
	res.status(200).json({
		status:true,
		data:req.userdata
	});
});

// export router
module.exports = router;