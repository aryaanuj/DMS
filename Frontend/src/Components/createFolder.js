import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const createFolder = () =>{
	const [fname, setFname] = useState("");
	const history = useHistory();
	const handleInput = (e) => {
		setFname(e.target.value);
	}
	
	const handleSubmit = async (e) =>{
		e.preventDefault();
		const response = await axios.post("folder/create-new-folder", {
				folder_name:fname, 
				user_id:JSON.stringify(localStorage.get('user')).user_id
			}).catch((err)=>{
				console.log(err);
			});
			console.log(response);
			history.push('/');
	}

	return (
		
		 <div className="back">
			<div className="div-center">
			  <div className="content">
			  <hr />
			    <form onSubmit={handleSubmit}>
			      <div className="form-group mb-3">
			        <label htmlFor="exampleInputEmail1">Folder Name</label>
			        <input type="text" name="fname" className="form-control" value={fname} onChange={handleInput}  placeholder="Folder Name" />
			      </div>
			      
			      <button type="submit" className="btn btn-primary">Create</button>
			    </form>
			  </div>
			</div>
		</div>
		);
}

export default createFolder;