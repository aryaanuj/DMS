// init code
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


// user schema
const userSchema = mongoose.Schema({
	email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	},
	createdOn:{
		type:Date,
		default:Date.now()
	},
	tokens:[
		{
			token:{
				type:String,
				required:true
			}
		}
	]
});


userSchema.methods.generateAuthToken = async function(){
	const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET);
	this.tokens = this.tokens.concat({token:token});
	await this.save();
	return token;
}

// user model
const User = mongoose.model('users',userSchema);

// export model
module.exports = User;
