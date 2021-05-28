import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';

const Home = () =>{
	const history = useHistory();
	const [isAuthenticated, setisAuthenticated] = useState(false);
	const [fdata, setfData] = useState([]);
	const [filedata, setfileData] = useState([]);
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


	console.log(fdata);
	const getFolderFiles = async (id) =>{
		// console.log(id);
		// const res = await axios.get("folder-file/", {fid:id}).catch((err)=>console.log(err));
		// console.log(res.data.data);
		// setfData(res.data.data);
	}
	const fetchFolder = fdata.map((item, index)=>{
		var {folder_name,file_name, _id} = item;
		if(file_name!=undefined){
			folder_name = file_name;
		}
		
		return (<tr key={index}>
				<td onClick={()=>getFolderFiles(_id)} style={{cursor:'pointer'}}>{folder_name}</td>

			</tr>
		);
	});

	// const getFileContent = (content) =>{
	// 	console.log(content);
	// }
	// const fetchFiles = filedata.map((item, index)=>{
	// 	const {file_name, content} = item;
	// 	return (<tr key={index}>
	// 			<td  onClick={()=>getFileContent(content)} style={{cursor:'pointer'}}>{file_name}</td>
	// 		</tr>
	// 	);
	// })
	return (
		<div className="container">
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