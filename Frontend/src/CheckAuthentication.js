

const CheckAuthentication = () =>{

	const history = useHistory();

	if(localStorage.getItem('user') == null){
		history.push('/login');
	}
}

export default CheckAuthentication;