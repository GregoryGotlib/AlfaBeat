import React, { Component } from 'react';
import { setDecodedUser } from './actions/auth';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import CustomNavbar from './components/foundation/CustomNavbar';
import Base from './components/foundation/Base';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Post from './components/user/Post';
import Dashboard from './components/user/Dashboard';
import CreateProfile from './components/user/CreateProfile';
import EditProfile from './components/user/EditProfile';
import CreateCarInfo from './components/user/CreateCarInfo';
import CreatePhotoAlbum from './components/user/CreatePhotoAlbum';
import ProfileGenerator from './components/user/ProfileGenerator';
import Profiles from './components/profiles/Profiles';
import PrivateRoute from './utilities/privateRoute';
import Posts from './components/user/Posts';
import store from './store';
import setAuth from './utilities/setAuth';
import jwt_decode from 'jwt-decode';
import './App.css';
import FileUpload from './components/user/FileUpload';



// in case we have token
if(localStorage.userToken){
  setAuth(localStorage.userToken);

  //Decode token
  const decoded_token = jwt_decode(localStorage.userToken);

  //Set decoded user
  store.dispatch(setDecodedUser(decoded_token));
}


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <CustomNavbar/>
            <Route exact path="/" component={Base}/>
            <div className="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profiles" component={Profiles}/>
              <Route exact path="/profile/:route" component={ProfileGenerator}/>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/createProfile" component={CreateProfile}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/editProfile" component={EditProfile}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/createCarInfo" component={CreateCarInfo}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/posts" component={Posts}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/fileupload" component={FileUpload}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
