import React, { Component } from 'react'
import propTypes from 'prop-types';
import '../../style/ProfilesData.css';

export default class ProfilesData extends Component {
  render() {
      const profile = this.props.profile;
    return (      
      <div className="card bg-light mb-5" id='profiles-cards-wrapper'>
        <div className="profile-container">
            <div className="circle-container">
                <img className="rounded-circle" src={profile.user.avatar} alt="" />
            </div>
            <div className="profile-data-container">
                <h3>{profile.user.name}</h3>
                <p><span>From: {profile.location}</span> </p>
                <p><span>Profession: {profile.profession}</span> </p>
                <a style={{marginBottom:"3px"}} className="btn btn-info" href={`/profile/${profile.route}`}>View Profile</a>
            </div>
        </div>        
      </div>
    )
  }
}

ProfilesData.propTypes = {
profile: propTypes.object.isRequired
};