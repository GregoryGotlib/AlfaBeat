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
                <h1 className="display-3 mb-4">Alfa Connector
                </h1>
                <p className="lead"> Create a Alfa romeo owner profile, share your thoughts with others and help each other to fall in love with this machine</p>
                <hr />
                <a href="/register" className="btn btn-lg btn-info mr-2">Sign Up</a>
                <a href="/login" className="btn btn-lg btn-success">Login</a>
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