import React, { Component } from 'react'
import propTypes from 'prop-types';

export default class ProfilesData extends Component {
  render() {
      const profile = this.props.profile;
    return (

      

      <div className="card bg-light mb-5" style={{width: "15cm"}}>
        <div className="row">
            <div className="col-2">
                <img className="rounded-circle" src={profile.user.avatar} alt="" />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
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