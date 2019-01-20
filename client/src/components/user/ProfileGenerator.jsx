
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfilebyRoute } from '../../actions/profile';
import propTypes from 'prop-types';
import ProfileHeaderView from './ProfileHeaderView';
import ProfilePersonalReview from './ProfilePersonalReview';
import Spinner from '../foundation/Spinner';
import ProfileCarInfo from './ProfileCarInfo';
import PostFeed from './PostFeed';


 class ProfileGenerator extends Component {


  componentDidMount(){
    if(this.props.match.params.route){
      this.props.getProfilebyRoute(this.props.match.params.route);
    }
  }
  


  render() {
    const profile = this.props.profile.profile;
    const loading = this.props.profile.loading;
    let profileData;

    if(profile === null || loading){
      profileData = <Spinner/>
    }
    else{
      profileData = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <a href="/profiles" className="btn btn-danger mb-3 float-left">
                Go back to profiles
              </a>
            </div>
            <div className="col-md-6"/>
          </div>
          <ProfileHeaderView profile={profile}/>
          <ProfilePersonalReview profile={profile}/>
          <ProfileCarInfo carInfo={profile.carInfo}/>
        </div>
      )
    }
    return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {profileData}
          </div>
        </div>
      </div>
    </div>  
    )
  }
}

ProfileGenerator.prototypes = {
    profile: propTypes.object.isRequired,
    getProfilebyRoute: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile:state.profile,
});

export default connect(mapStateToProps, {getProfilebyRoute} )(ProfileGenerator);