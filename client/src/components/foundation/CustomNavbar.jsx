import React, { Component } from 'react'
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOutUser } from '../../actions/auth';
import {clearConnectedProfile} from '../../actions/profile';

class CustomNavbar extends Component {
  
  logOutHandler=(event)=>{
    event.preventDefault();
    this.props.logOutUser();
    this.props.clearConnectedProfile();
  }

  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const user = this.props.auth.user;

    // Navbar links when user is authenticated
    const authenticatedUserLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/posts">Posts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a className="nav-link" href="#" onClick={this.logOutHandler}>
          <img className="rounded-circle" src={user.avatar} style={{width:'30px', marginRight:'5px',}} alt={user.name} title="Please get a Gravater to display an image!">
          </img>
          Logout
          </a>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/register">Register</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
      </ul>
    )

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <a className="navbar-brand" href="/">AlfaBeat</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsedData">
              <span className="navbar-toggler-icon"></span>
            </button>
      
            <div className="collapse navbar-collapse" id="collapsedData">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/profiles"> Members
                  </a>
                </li>
              </ul>
              {isAuthenticated ? authenticatedUserLinks : guestLinks}
            </div>
        </nav>
    )
  }
}

CustomNavbar.propTypes = {
  logOutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}

const mapStateToProps =(state)=>({
  auth:state.auth
})

export default connect(mapStateToProps,{logOutUser , clearConnectedProfile})(CustomNavbar);