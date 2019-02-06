import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, deleteAccount } from '../../actions/profile';
import { logOutUser } from '../../actions/auth';
import Spinner from '../foundation/Spinner';
import propTypes from 'prop-types';
import Profile from '../user/Profile';
import CarInfo from '../user/CarInfo';
import Images from '../user/Images';

class Dashboard extends Component {
    componentDidMount(){
        this.props.getProfile();
    }

    onDeleteHandler = (event) =>{
      this.props.deleteAccount();
      this.props.logOutUser();
    }
  render() {
    const loading = this.props.profile.loading
    const profile = this.props.profile.profile
    const user = this.props.auth.user;
    let showData;

    if(profile === null || loading){
      showData = <Spinner/>
    }
    else{
      // If user has a profile
      console.log(profile.carInfo);

      if(Object.keys(profile).length > 0){
        showData = (
        <div>
          <p className="lead text-muted">
          Welcome <a href={`/profile/${profile.route}`}>{user.name}</a>
          <span style={{marginLeft:'65px'}}><button className="btn btn-danger" onClick={this.onDeleteHandler}>Delete Account</button> </span>
          </p>
          <Profile/>
          <CarInfo carInfo={profile.carInfo}/>
          <Images image={profile.image}/>
          <div style={{marginBottom: '60px'}}>
          </div>
        </div>
        )
      }
      else{
        showData = (
          <div>
            <p className="lead text-muted">Welcome {user.name} !</p>
            <p>Please press the link to create a profile.</p>
            <a href="/CreateProfile" className="btn btn-lg btn-success">Create Profile</a>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {showData}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
  deleteAccount:propTypes.func.isRequired,
  logOutUser:propTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
  profile:state.profile,
  auth:state.auth
});

export default connect(mapStateToProps,{ getProfile, deleteAccount,logOutUser })(Dashboard);
