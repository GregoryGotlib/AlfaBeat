import React, { Component } from 'react';
import cheakInput from '../../utilities/checkInput';

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
    <div class="row">
        <div class="col-md-12">
        <h3 class="text-center text-info">{userFirstName}'s personal review</h3>
          <div class="card card-body bg-light mb-3">
            <p class="lead">{personalReview}</p>
          </div>
        </div>
    </div>

    )
  }
}
