import React, { Component } from 'react'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { logUser } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

 class Login extends Component {
  constructor(){
    super();  
  }

  state = {
    email:'',
    password:'',
    errors:{}
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  emailHandler = (event) =>{
    this.setState({email:event.target.value});
  }

  passwordHandler = (event) =>{
    this.setState({password:event.target.value});
  }

  onSubmit = (event) =>{
    event.preventDefault();
    const User={
      email:this.state.email,
      password:this.state.password
    }
    this.props.logUser(User);
  }

  render() {
    const errors = this.props.errors;
    
    return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">You are about to get started ..</p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="email"  className={classnames('form-control form-control-lg',{
                'is-invalid':errors.email})} placeholder="Email Address" name="email" 
                value={this.state.email} onChange={this.emailHandler} />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              </div>
              
              <div className="form-group">
                <input type="password" className={classnames('form-control form-control-lg',{
                'is-invalid':errors.password})} placeholder="Password" name="password"  value={this.state.password} onChange={this.passwordHandler}/>
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              </div>
              <input type="submit" className="btn btn-success btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

Login.propTypes = {
  Login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

};

const mapStateToProps = (state)=>({
  auth:state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { logUser })(withRouter(Login));