import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Base extends Component {

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }


  render() {
    return (
    <div className="Base">
        <div className="dark-overlay Base-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-2 mb-4">Welcome to Alfabeat
                </h1>
                <h2 className="lead"> Social network for alfa romeo enthusiasts, connect and share your thoughts with others</h2>
                <hr />
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}
Base.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state)=>({
  auth:state.auth
});

export default connect(mapStateToProps)(Base);