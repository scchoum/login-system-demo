import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingPage from '../common/LoadingPage';
import AppHeader from '../common/AppHeader';
import PrivateRoute from '../common/PrivateRoute';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants/Constants';

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCurrentLoggedInUser = () => {
    setLoading(true);

    getCurrentUser()
    .then(response => {
      setAuthenticated(true);
      setCurrentUser(response);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    });
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    alert("You're safely logged out!");
  }

  useEffect(() => {
    loadCurrentLoggedInUser();
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <div className="app">
      <AppHeader authenticated={authenticated} onLogout={handleLogout}></AppHeader>
      <div className="app-body">
        <Switch>
          <Route exact path="/" component={Home}/>    
          <Route path="/login" render={(props) => <Login authenticated={authenticated} setAuthenticated={setAuthenticated} setCurrentUser={setCurrentUser} {...props} />}/> 
          <Route path="/signup" render={(props) => <Signup authenticated={authenticated} setAuthenticated={setAuthenticated} setCurrentUser={setCurrentUser} {...props} />}/> 
          <PrivateRoute path="/profile" authenticated={authenticated} currentUser={currentUser} component={Profile}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
