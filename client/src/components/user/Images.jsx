import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteImage } from '../../actions/profile';
import propTypes from 'prop-types';
import './Images.css'


 class Images extends Component {

deleteHandler = (imageID) =>{
    console.log('deleting image...',imageID)
    this.props.deleteImage(imageID);
}


  render() {
      const images = this.props.image.map(image=>(  
         
        <li key={image._id}>
            <div className="xop-box xop-img-1">
             <img src={image.path}/>
            </div>
            <button onClick={() => this.deleteHandler(image._id)} className="btn btn-danger">Delete photo</button>
        </li>
    
      ))  
      

    return (
    <div style={{textAlign:"center"}}>
        <h2 style={{marginTop: '50px'}}>Your photo album:</h2>
        <hr/>
        <div className="xop-section" >
            <ul className="xop-grid">
                {images}
            </ul>   
        </div>
    </div>
    )
  }
}

Images.propTypes = {
    deleteImages: propTypes.func.isRequired
};

export default connect(null,{deleteImage})(Images);