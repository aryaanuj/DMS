import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';

const CreateFile = () =>{
	const [data, setData] = useState({
		filename:"",
		foldername:"",
		content:""
	});
	const [folders, setFolders] = useState([]);
	const history = useHistory();
	const handleInput = (e) => {
		setData({...data, [e.target.name]:e.target.value});
		// console.log(data);
	}


	const checkAuth = () => {
		if(localStorage.getItem('user') == null){
			history.push('/login');
		}
	}



	const fetchFolders = async () =>{
		const datas = JSON.parse(localStorage.getItem('user'));
		if(data!=null){
			// setisAuthenticated(true);
			axios.defaults.headers.common['x-access-token'] = datas.token;
			const response = await axios.get("folder/?user_id="+datas.user_id).catch((err)=>console.log(err));
			setFolders(response.data.data);
		}
	}

	useEffect(()=>{
		checkAuth();
		fetchFolders();
	}, []);


	console.log(folders);
	
	const handleSubmit = async (e) =>{
		e.preventDefault();
		var response;
		if(data.folder_name!=""){
			response = await axios.post("file/create-new-file", {
				file_name:data.filename, 
				user_id:JSON.parse(localStorage.getItem('user')).user_id,
				content:data.content,
				folder_id:data.foldername
			}).catch((err)=>{
				console.log(err);
			});
		}else{
			response = await axios.post("file/create-new-file", {
				file_name:data.filename, 
				user_id:JSON.parse(localStorage.getItem('user')).user_id,
				content:data.content
			}).catch((err)=>{
				console.log(err);
			});
		}
		
		console.log(response);
		// history.push('/');
		
	}

	const folderdata = folders.map((item, index)=>{
			return (
					<option key={index} value={item._id}>{item.folder_name}</option>
				);
	});

	return (
		
		 <div className="back">
			<div className="div-center">
			  <div className="content">
			  <h3>Create New File</h3>
			  <hr />
			    <form onSubmit={handleSubmit}>

			    
			      <div className="form-group mb-3">
			        <label htmlFor="exampleInputEmail1">File Name</label>
			        <input type="text" name="filename" className="form-control" value={data.filename} onChange={handleInput}  placeholder="File Name" />
			      </div>
			      <div className="form-group mb-3">
			        <label htmlFor="exampleInputEmail1">Content</label>
			        <textarea type="text" name="content" className="form-control" value={data.content} onChange={handleInput}  placeholder="write some content.." ></textarea>
			      </div>
			      <div className="form-group mb-3">
			        <label htmlFor="exampleInputEmail1">Folder Name</label>
			        <select className="form-control" name="foldername" onChange={handleInput}>
			        <option value="no">Select Folder</option>
			        {folderdata}
			        </select>
			      </div>
			      	<button type="submit" className="btn btn-primary btn-block">Create</button>
			    </form>
			    <Link to="/" className='btn btn-success btn-block'>Back</Link>
			  </div>
			</div>
		</div>
		);
}

export default CreateFile;