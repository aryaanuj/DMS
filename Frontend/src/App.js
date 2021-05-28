import React from 'react';
import Navbar from './Components/Layout/Navbar';
import Home from './Components/Home';
import LoginPage from './Components/Login/LoginPage';
import CreateFolder from './Components/CreateFolder';
import CreateFile from './Components/CreateFile';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () =>{

  return (   
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/createFolder" exact component={CreateFolder} />
          <Route path="/createFile" exact component={CreateFile} />
          <Route>Error: 404 Page Not Found</Route>
        </Switch>
      </Router>
    </React.Fragment>
    );
}

export default App;
