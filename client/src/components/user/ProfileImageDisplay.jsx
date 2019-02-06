import React, { Component } from 'react'
import './ProfileImageDisplay.css'
import logo from '../../images/greenStar.png';



export default class ProfileImageDisplay extends Component {

  render() {
    console.log(this.props)
      const imgs = this.props.image.map(image => (
          <img src={image.path}/>
      ))

    return (
    <div class="row">
        <div class="col-md-12">
          <h3 class="text-center text-info">Photo album</h3>
          <div class="card card-body bg-light mb-3">
            <p class="lead"/>
            <div className="xop-section" >
              <ul className="xop-grid">
                {imgs}
              </ul>   
            </div>
          </div>
        </div>
    </div>
    )
  }
}
