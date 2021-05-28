import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';

const Home = () =>{
	const history = useHistory();
	const [isAuthenticated, setisAuthenticated] = useState(false);
	const [fdata, setfData] = useState([]);
	const [filedata, setfileData] = useState();
	const [contentStatus, setContentStatus] = useState(false);
	// fetch user profile
	const fetchData = async () =>{
		const data = JSON.parse(localStorage.getItem('user'));
		if(data!=null){
			setisAuthenticated(true);
			axios.defaults.headers.common['x-access-token'] = data.token;
			const response = await axios.get("folder/?user_id="+data.user_id).catch((err)=>console.log(err));
			
			const fileres = await axios.get("file/?user_id="+data.user_id).catch((err)=>console.log(err));
			const fd = response.data.data.concat(fileres.data.data);
			setfData(fd);
			
		}
	}

	// check user is authenticated or not
	const checkAuth = () => {
		if(localStorage.getItem('user') == null){
			history.push('/login');
		}
	}

	useEffect(()=>{
		checkAuth();
		fetchData();
	}, []);


	// console.log(fdata);
	const getFolderFiles = async (id, isFile) =>{
		// console.log(id);
		if(!isFile){
			const res = await axios.get("file/fileByFolder", {folderid:id}).catch((err)=>console.log(err));
			console.log(res);
			// setfileData(res.data.data);
		}else{
			const data = JSON.parse(localStorage.getItem('user'));
			const res = await axios.get("file/fileById/?user_id="+data.user_id+"&fileid="+id).catch((err)=>console.log(err));
			console.log(id);
			console.log(res.data.data[0].content);
			setfileData(res.data.data[0].content);
		}

		setContentStatus(true);
		// console.log(filedata);
		
	}
	const fetchFolder = fdata.map((item, index)=>{
		var {folder_name,file_name, _id} = item;
		var isFile= false;
		if(file_name!=undefined){
			folder_name = file_name;
			isFile = true;
		}
		
		return (<tr key={index}>
				<td onClick={()=>getFolderFiles(_id, isFile)} style={{cursor:'pointer'}}>{folder_name}</td>
			</tr>
		);
	});
	// console.log("heelo"+filedata);
	var cdata="";
	if(contentStatus){
		cdata = <div className="m-4">
			<p>File Content: {filedata}</p>
		</div>
	}
	return (
		
		<div className="container">
		{cdata}
		<div className="row">
		<div className="col-md-2">
		<Link to='/createFolder' className="btn btn-primary btn-sm">New Folder</Link>
		</div>
		<div className="col-md-2">
		<Link to='/createFile' className="btn btn-primary btn-sm ml-2">New File</Link>
		</div>
		</div>
		<table className="table table-striped table-bordered">
			<thead>
			<tr>
				<th>Folders/Files</th>
			</tr>
			</thead>
			<tbody>
			
			{fetchFolder}
			</tbody>
		</table>
		
		</div>
		
			
		);
}

export default Home;