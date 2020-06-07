import React, { Component } from 'react';
import '../../style/ProfilePersonalReview.css';

export default class ProfilePersonalReview extends Component {
  render() {
    const profile = this.props.profile;
    const userFirstName = profile.user.name.trim().split(' ')[0];
    const personalReview = profile.carInfo.map(data =>(
        <div>
            <p style={{color:'rgb(255,0,0)'}}><strong style={{color:'black'}}>{data.model}: </strong>"{data.personalReview}"</p>
        </div>
    ))

    return (
    <div className="">
        <p className="review-p">{userFirstName}'s personal review</p>
        <div className="card card-body bg-light mb-3" id='profile-review-card'>
          <p className="lead">{personalReview.length ? personalReview : <p>There is no reviews yet ..</p>}</p>
        </div>
    </div>

    )
  }
}
