import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import classnames from 'classnames';

class CreatePhotoAlbum extends Component {

    state = {
        selectedPhoto:null,
        photos:[]
    };

   onChosenPhoto = (event) =>{
    console.log(event.target.files[0]);
    this.setState({selectedPhoto:event.target.files[0]});
   };

   uploadHandler = () =>{
    console.log(this.state.photos);
    this.setState(prevState => ({
        photos: [...prevState.photos, this.state.selectedPhoto]
    }));
    console.log(this.state.photos);
    };

    render() {
        const errors = this.props.errors;
      return (
        <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-dark text-white">
                Upload New Photo
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input type="file" className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.text
                        })}
                        placeholder="Image URL"
                        name="imageURL"
                       // value={this.state.text}
                        onChange={this.onChosenPhoto}
                    />
                    <small className="form-text text-muted"></small>
                    {errors.text && <div className="invalid-feedback">{errors.text}</div>}
                   </div>
                  <button  onClick={this.uploadHandler} className="btn btn-success">Upload Photo</button>
                </form>
              </div>
            </div>
        </div>
      )
    }
  }

  CreatePhotoAlbum.propTypes = {
    errors: propTypes.object.isRequired,
    createPhotoAlbum: propTypes.func.isRequired,
    profile: propTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
  });
  

export default connect(mapStateToProps)(CreatePhotoAlbum);
