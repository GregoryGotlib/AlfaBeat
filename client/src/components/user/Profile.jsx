import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    return (
    <div className="btn-group mb-4" role="group">
        <a href="/editProfile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</a>
        <a href="/CreateCarInfo" className="btn btn-light">
          <i className="fa fa-car text-info mr-1"></i>
          Add vehicle info</a>
        <a href="/fileupload" className="btn btn-light">
          <i className="far fa-image text-info mr-1"></i>
          Add photo</a>
    </div>
    )
  }
}
