import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, deleteAccount } from '../../actions/profile';
import { logOutUser } from '../../actions/auth';
import Spinner from '../foundation/Spinner';
import propTypes from 'prop-types';
import EditProfile from '../user/EditProfile';
import CarInfo from '../user/CarInfo';
import Images from '../user/Images';
import CreateCarInfo from './CreateCarInfo';
import FileUpload from './FileUpload';
import '../../style/Dashboard.css';

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
      if(Object.keys(profile).length > 0){
        showData = (
        <div className='show-data-container'>
          <p id='wellcome-p' className="lead text-muted">
          Welcome <a href={`/profile/${profile.route}`}>{user.name}</a>
          </p>
          <CarInfo carInfo={profile.carInfo}/>
          <Images image={profile.image}/>
          <div style={{marginBottom: '60px'}}>
          </div>
        </div>
        )
      }
      else{
        showData = (
          <div className='show-empty-data-container'>
            <p className="lead text-muted">Welcome {user.name} !</p>
            <p className='create-profile-p'>Please press the link to create a profile.</p>
            <a href="/CreateProfile" className="btn btn-lg btn-primary">Create Profile</a>
          </div>
        )
      }
    }

    return (
      <div className='dashboard-wrapper'>
      <div className='navs-container'>
        <nav id='navs'>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id="nav-dashboard-tab" data-toggle="tab" href="#nav-dashboard" role="tab" aria-controls="nav-dashboard" aria-selected="true"><i className="fa fa-desktop text-info mr-1"></i>Dashboard</a>
            <a className="nav-item nav-link" id="nav-edit-tab" data-toggle="tab" href="#nav-edit" role="tab" aria-controls="nav-edit" aria-selected="false"><i className="fas fa-user-circle text-info mr-1"></i>Edit Profile</a>
            <a className="nav-item nav-link" id="nav-info-tab" data-toggle="tab" href="#nav-info" role="tab" aria-controls="nav-info" aria-selected="false"><i className="fa fa-car text-info mr-1"></i>Add Vehicle Info</a>
            <a className="nav-item nav-link" id="nav-image-tab" data-toggle="tab" href="#nav-image" role="tab" aria-controls="nav-image" aria-selected="false"><i className="far fa-image text-info mr-1"></i>Add Image</a>
          </div>
            <span><button className="btn btn-danger" onClick={this.onDeleteHandler}>Delete Account</button> </span>
        </nav>
      </div>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-dashboard" role="tabpanel" aria-labelledby="nav-dashboard-tab">{showData}</div>
        <div className="tab-pane fade" id="nav-edit" role="tabpanel" aria-labelledby="nav-edit-tab"><EditProfile/></div>
        <div className="tab-pane fade" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab"><CreateCarInfo/></div>
        <div className="tab-pane fade" id="nav-image" role="tabpanel" aria-labelledby="nav-image-tab"><FileUpload/></div>
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
