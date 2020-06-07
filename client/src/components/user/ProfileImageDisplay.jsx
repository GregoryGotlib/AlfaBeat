import React, { Component } from 'react'
import './ProfileImageDisplay.css'
import moment from 'moment'
import '../../style/ProfileImageDisplay.css';


export default class ProfileImageDisplay extends Component {

  render() {
    
    const images = this.props.image.map(image=>(  
     
      <div className="card" key={image._id} id='flex-row-item' id='profile-card'>
          <img src={image.path} className="card-img-top" alt="..."/>
          <div className="card-body">
              <p className="card-text"><small className="text-muted">{moment(image.date).format('L')}</small></p>
              <button onClick={() => this.deleteHandler(image._id)} className="btn btn-danger">Delete Image</button>
          </div>
      </div>

))  

    return (
  <div style={{textAlign:"center"}}>
    <p className='image-p'>Image album</p>
    <div className="card-group" id='flex-row-container'>
          {images.length ? images : <p>There is no image uploads yet ..</p>}
    </div>
  </div>
    )
  }
}
