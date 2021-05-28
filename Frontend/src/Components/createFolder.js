import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';

const CreateFolder = () =>{
	const [data, setData] = useState({
		folder:""
	});
	const history = useHistory();
	const handleInput = (e) => {
		setData({...data, folder:e.target.value});
	}

	const checkAuth = () => {
		if(localStorage.getItem('user') == null){
			history.push('/login');
		}
	}

	useEffect(()=>{
		checkAuth();
	}, []);


	const handleSubmit = async (e) =>{
		e.preventDefault();
		const response = await axios.post("folder/create-new-folder", {
				folder_name:data.folder, 
				user_id:JSON.parse(localStorage.getItem('user')).user_id
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
			  <h3>Create New Folder</h3>
			  <hr />
			    <form onSubmit={handleSubmit}>
			      <div className="form-group mb-3">
			        <label htmlFor="exampleInputEmail1">Folder Name</label>
			        <input type="text" name="fname" className="form-control" value={data.folder} onChange={handleInput}  placeholder="Folder Name" />
			      </div>
			      	<button type="submit" className="btn btn-primary btn-block">Create</button>
			    </form>
			    <Link to="/" className='btn btn-success btn-block'>Back</Link>
			  </div>
			</div>
		</div>
		);
}

export default CreateFolder;