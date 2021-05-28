const jwt = require('jsonwebtoken');
const User = require('./../models/user');

const Authentication = async (req,res,next) =>{
	try{
		const token = req.headers['x-access-token'];
		// res.json({
		// 	token:token
		// });
		const verifiedToken = jwt.verify(token,process.env.JWT_SECRET);

		const userdata = await User.findOne({"_id":verifiedToken._id, "tokens.token":token});
		if(!userdata) { throw new Error("User not found") }
		req.token = token;
		req.userdata = userdata;
		req.id = userdata._id;
		next();
	}catch(err){
		res.status('401').json({
			status:false,
			error:"Unauthorized: No token provided"+err
		});
	}
}

module.exports = Authentication;