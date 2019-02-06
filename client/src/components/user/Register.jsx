import React, { Component } from 'react'
import classnames from 'classnames';
import { connect } from 'react-redux';
import { regUser } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Register extends Component {
  constructor(){
    super();  
  }

  state = {
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    errors:{}
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  
  nameHandler = (event) =>{
    this.setState({name:event.target.value});
  }

  emailHandler = (event) =>{
    this.setState({email:event.target.value});
  }

  passwordHandler = (event) =>{
    this.setState({password:event.target.value});
  }

  confirmPasswordHandler = (event) =>{
    this.setState({confirmPassword:event.target.value});
  }

  onSubmit = (event) =>{
    event.preventDefault();
    
    const newUser={
      name:this.state.name,
      password:this.state.password,
      confirmPassword:this.state.confirmPassword,
      email:this.state.email
    }

    this.props.regUser(newUser, this.props.history); 
  }




  render() {
    const errors = this.props.errors;
  return (
<div className="card mt-20 shadow p-3 mb-5 bg-white rounded">
  <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Create Account</h1>
          <br/>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" className={classnames('form-control form-control-lg',{
                'is-invalid': errors.name})} 
                placeholder="Your full name" name="name" value={this.state.name} 
                onChange={this.nameHandler} />
                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
            </div>
            <div className="form-group">
              <input type="email" className={classnames('form-control form-control-lg',{
                'is-invalid':errors.email})} placeholder="Email Address" name="email" 
                value={this.state.email} onChange={this.emailHandler}/>
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg',{
                'is-invalid':errors.password})} placeholder="Password" name="password" 
                value={this.state.password} 
              onChange={this.passwordHandler}/>
              {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
            </div>
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg',{
                'is-invalid':errors.confirmPassword})} placeholder="Confirm Password" name="confirmPassword" value={this.state.confirmPassword} 
              onChange={this.confirmPasswordHandler} />
              {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
            </div>
            <input type="submit" className="btn btn-success btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
    )
  }
}

Register.propTypes = {
  regUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

};

const mapStateToProps = (state)=>({
  auth:state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { regUser })(withRouter(Register))