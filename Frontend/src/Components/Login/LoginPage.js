import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const LoginPage = () =>{
	const [data, setData] = useState({
		email:"",
		password:""
	});
	const [register, setRegister] = useState(false);
	const [title, setTitle] = useState("Login");
	const [msg, setMsg] = useState("");

	const history = useHistory();

	const handleSubmit = async (e) =>{
		e.preventDefault();

		if(!register){
			// siginin api
			const response = await axios.post("user/signin", {
				email:data.email, 
				password:data.password
			}).catch((err)=>{
				console.log(err);
			});

			// store token 
			localStorage.setItem('user', JSON.stringify({"isAuthenticated":true, "token":response.data.token, "user_id":response.data.userid}));
			console.log(response);
			history.push("/");	

		}else{
			// register api
			const response = await axios.post("user/register", {
				email:data.email, 
				password:data.password
			}).catch((err)=>{
				console.log(err);
			});

			console.log(response);
			setMsg(response.data.message);
			setRegister(false);	
			setTitle("Login");
		}
	}

	// handle form inputs
	const handleInput = (e) =>{
		setData({...data, [e.target.name]:e.target.value});
	}

	// check user is authenticated or not
	if(localStorage.getItem('user') != null){
		history.push("/");
	}
	

	// login/register button
	var rbutton;
	if(!register){
		
		rbutton = <a className="ms-5" style={{cursor:'pointer'}} onClick={()=>{setRegister(true); setTitle("Register")}}>Register</a>
			
	}else{
		
		rbutton = <a className="ms-5" style={{cursor:'pointer'}} onClick={()=>{setRegister(false); setTitle("Login")}}>Login</a>
	}	

	return (
		
		 <div className="back">
		 	<h4 className="text-center text-success">{msg}</h4>
			<div className="div-center">
			  <div className="content">
			  <h3>{title}</h3>
			  <hr />
			    <form onSubmit={handleSubmit}>
			      <div className="form-group mb-3">
			        <label htmlFor="exampleInputEmail1">Email address</label>
			        <input type="email" name="email" className="form-control" value={data.email} onChange={handleInput}  placeholder="Email" />
			      </div>
			      <div className="form-group mb-3">
			        <label htmlFor="exampleInputPassword1">Password</label>
			        <input type="password" className="form-control" name="password" value={data.password}  onChange={handleInput} placeholder="Password" />
			      </div>
			      <button type="submit" className="btn btn-primary">{title}</button>
			      {rbutton}
			    </form>
			  </div>
			</div>
		</div>
		);
}

export default LoginPage;