import React, { Component } from 'react';
import cheakInput from '../../utilities/checkInput';

export default class ProfileHeaderView extends Component {
  render() {
    const profile = this.props.profile;

    return (
      <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-dark text-white mb-3">
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    <img className="rounded-circle" src={profile.user.avatar} alt="" />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="display-4 text-center">{profile.user.name}</h1>
                  <p className="lead text-center">{profile.profession}</p>
                  <p>{profile.location}</p>
                  <p>
                    {cheakInput(profile.social&&profile.social.youtube) ? null : (
                    <a className="text-white p-2" href={profile.social.youtube}>
                      <i className="fab fa-youtube
                       fa-2x"></i>
                    </a>
                    )}

                    {cheakInput(profile.social&&profile.social.instagram) ? null : (
                    <a className="text-white p-2" href={profile.social.instagram}>
                      <i className="fab fa-instagram
                       fa-2x"></i>
                    </a>
                    )}

                    {cheakInput(profile.social&&profile.social.facebook) ? null : (
                    <a className="text-white p-2" href={profile.social.facebook}>
                      <i className="fab fa-facebook
                       fa-2x"></i>
                    </a>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

    )
  }
}
