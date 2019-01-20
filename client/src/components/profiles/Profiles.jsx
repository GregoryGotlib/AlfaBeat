import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfilesData from './ProfilesData';
import propTypes from 'prop-types';
import Spinner from '../foundation/Spinner';

class Profiles extends Component {
    componentDidMount(){
        this.props.getProfiles();
    }
  render() {
      const profiles = this.props.profile.profiles;
      const loading = this.props.profile.loading;
      let profilesData;
      if(profiles === null || loading){
        profilesData = <Spinner/>
      }

      else{
          if(profiles.length > 0){
            profilesData = profiles.map(profile=>(
                <ProfilesData key={profile._id} profile={profile}/>
            ))
          }
          else{
            profilesData = <h3>No members available...</h3>
          }
      }
    return (
      <div className="profiles">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Club Members Profile</h1>
                    <p className="lead text-center">Browse and connect</p>
                    {profilesData}
                </div>
            </div>
        </div>        
      </div>
    )
  }
}



Profiles.propTypes = {
    profile: propTypes.object.isRequired,
    errors: propTypes.object.isRequired,
    getProfiles: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    profile:state.profile,
    errors:state.errors
});

export default connect(mapStateToProps,{getProfiles})(Profiles);