import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfilebyRoute } from '../../actions/profile';
import propTypes from 'prop-types';
import ProfileHeaderView from './ProfileHeaderView';
import ProfilePersonalReview from './ProfilePersonalReview';
import ProfileImageDisplay from './ProfileImageDisplay';
import ProfileCarInfo from './ProfileCarInfo';
import Spinner from '../foundation/Spinner';
import '../../style/ProfileGenerator.css';


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
          <ProfileHeaderView profile={profile}/>
          <ProfilePersonalReview profile={profile}/>
          <ProfileCarInfo carInfo={profile.carInfo}/>
          <ProfileImageDisplay image={profile.image}/>
        </div>
      )
    }
    return (
    <div className="profile-container">
      {profileData}
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