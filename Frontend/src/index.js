import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api/';
const data = JSON.parse(localStorage.getItem('user'));
if(data!=null){
	axios.defaults.headers.common['x-access-token'] = data.token;
}

ReactDOM.render(
	<App/>, 
	document.getElementById('root')
);


