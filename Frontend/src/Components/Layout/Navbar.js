import React, {useHistory} from 'react';
import {Link} from 'react-router-dom';

const Navbar = () =>{
	const history = useHistory();

	// logout functionality
	const logout = () =>{
		localStorage.clear();
		history.push('/login');
	}

	var navLink;
	if(localStorage.getItem('user') != null){
			navLink = <a className="nav-link" style={{cursor:'pointer'}} onClick={logout}>Logout</a>
		}else{ navLink = <Link to="/login" className="nav-link" >Login</Link>}
	
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
		  <div className="container-fluid">
		    <a className="navbar-brand" href="#">DMS</a>
		    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarNav">
		      <ul className="navbar-nav ms-auto">
		        <li className="nav-item">
		          <a className="nav-link active" aria-current="page" href="#">Home</a>
		        </li>
		        <li className="nav-item">
		        	{navLink}
		        </li>
		      </ul>
		    </div>
		  </div>
		</nav>
	);
}

export default Navbar;