import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteImage } from '../../actions/profile';
import propTypes from 'prop-types';
import './Images.css'
import moment from 'moment'


 class Images extends Component {

deleteHandler = (imageID) =>{
    console.log('deleting image...',imageID)
    this.props.deleteImage(imageID);
}


  render() {
      const images = this.props.image.map(image=>(  
     
            <div className="card" key={image._id} id='flex-row-item'>
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
            {images.length ? images : <p>Your didn't upload any images yet ..</p>}
        </div>
    </div>
    )
  }
}

Images.propTypes = {
    deleteImages: propTypes.func
};

export default connect(null,{deleteImage})(Images);