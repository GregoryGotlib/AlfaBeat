import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadImage } from "../../actions/profile";
import { withRouter } from 'react-router';
import propTypes from "prop-types";
import '../../style/FileUpload.css';

class FileUpload extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    image: null
  };

  fileChangedHandler = event => {
    this.setState({ image: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  uploadHandler = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('image',this.state.image);
    this.props.uploadImage(formData, this.props.history);
  };

  render(){
    return (
    <div className='uploader-conainer'>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <div className="container p-5">
            <div
              className="card border-light mb-3" id='fileupload-card'
              style={{ boxShadow: "0 5px 10px 2px rgba(195,192,192,.5)" }}
            >
              <div className="card-header bg-dark">
                <h3 style={{ color: "white", marginLeft: "12px" }}>
                  Upload Photo
                </h3>
              </div> 
              <div className="card-body">
                <p className="card-text" style={{ fontWeight: "bold" }}>
                  * Please upload your vehicle photos only, no selfies wanted!
                </p>
                <form method="post" encType="multipart/form-data">
                  <input type="file" name="image" onChange={this.fileChangedHandler} />
                </form>
                  <div className="mt-5">
                  <button className="btn btn-info" onClick={this.uploadHandler}>
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

FileUpload.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  uploadImage: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps,{ uploadImage })(withRouter(FileUpload));
