import React, { Component } from 'react'
import { createProfile, getProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import classnames from 'classnames';
import checkInput from '../../utilities/checkInput';
import '../../style/EditProfile.css';

class EditProfile extends Component {
    constructor(props){
        super(props);
    }

    state = {
        errors:{},
        location:'',
        route:'',
        profession:'',
        facebook:'',
        instagram:'',
        youtube:''
    }


    componentDidMount(){  
        this.props.getProfile();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }

        // Copies the profile fields to the edit profile path
        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile;

            if(checkInput(profile.location)){
                profile.location = '';
            }

            if(checkInput(profile.route)){
                profile.route = '';
            }

            if(checkInput(profile.profession)){
                profile.profession = '';
            }

            if(checkInput(profile.social)){
                profile.social = {};
            }
            
            if(checkInput(profile.social.instagram)){
                profile.social.instagram = '';
            }

            if(checkInput(profile.social.facebook)){
                profile.social.facebook = '';
            }

            if(checkInput(profile.social.youtube)){
                profile.social.youtube = '';
            }

            this.setState({
            location:profile.location,
            route:profile.route,
            profession:profile.profession,
            facebook:profile.social.facebook,
            instagram:profile.social.instagram,
            youtube:profile.social.youtube,
            });
        }
    }


    professionHandler = (event) =>{
        this.setState({profession:event.target.value});
    }

    locationHandler = (event) =>{
        this.setState({location:event.target.value});
    }

    routeHandler = (event)=>{
        this.setState({route:event.target.value});
    }

    facebookHandler = (event)=>{
        this.setState({facebook:event.target.value});
    }

    instagramHandler = (event)=>{
        this.setState({instagram:event.target.value});
    }

    youtubeHandler = (event)=>{
        this.setState({youtube:event.target.value});
    }


    onSubmit = (event) =>{
        event.preventDefault();
        const newProfile = {
          route:this.state.route,
          facebook:this.state.facebook,
          youtube:this.state.youtube,
          instagram:this.state.instagram,
          location:this.state.location,
          profession:this.state.profession
        }
     
        this.props.createProfile(newProfile, this.props.history);
    }

  render() {
    const errors = this.state.errors;
    let socialData=(
    <div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                <i className="fab fa-facebook" />
                </span>
            </div>
            <input
                className={classnames('form-control form-control-lg', {
                'is-invalid': errors.facebook
                })}
                placeholder="Facebook Profile URL"
                name="facebook"
                value={this.state.facebook}
                onChange={this.facebookHandler}
            />
            {errors.facebook && <div className="invalid-feedback">{errors.facebook}</div>}
        </div>

        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                <i className="fab fa-instagram" />
                </span>
            </div>
            <input
                className={classnames('form-control form-control-lg', {
                'is-invalid': errors.instagram
                })}
                placeholder="Instagram Profile URL"
                name="instagram"
                value={this.state.instagram}
                onChange={this.instagramHandler}
            />
            {errors.instagram && <div className="invalid-feedback">{errors.instagram}</div>}
        </div>

        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                <i className="fab fa-youtube" />
                </span>
            </div>
            <input
                className={classnames('form-control form-control-lg', {
                'is-invalid': errors.youtube
                })}
                placeholder="Youtube Profile URL"
                name="youtube"
                value={this.state.youtube}
                onChange={this.youtubeHandler}
            />
            {errors.youtube && <div className="invalid-feedback">{errors.youtube}</div>}
        </div>

    </div>
    );

    const options = [
        {label:'* Select Your Alfa Romeo model', value:0},
        {label:'145',value:'145'},
        {label:'146',value:'146'},
        {label:'147',value:'147'},
        {label:'156',value:'156'},
        {label:'159',value:'159'},
        {label:'164',value:'164'},
        {label:'166',value:'166'},
        {label:'33',value:'33'},
        {label:'4C',value:'4C'},
        {label:'75',value:'75'},
        {label:'90',value:'90'},
        {label:'GT',value:'GT'},
        {label:'GTV',value:'GTV'},
        {label:'Brera',value:'Brera'},
        {label:'Giulia',value:'Giulia'},
        {label:'Giulietta',value:'Giulietta'},
        {label:'Mito',value:'Mito'},
        {label:'Sub',value:'Sub'},
        {label:'Spider',value:'Spider'},
        {label:'Sprint',value:'Sprint'},
      ];

return (
<div className='edit-form-container'>
<div className="card shadow p-3 mb-5 bg-white rounded">
    <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Edit Profile</h1>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.route})}
                            placeholder="Profile Route"
                            name="route"
                            value={this.state.route}
                            onChange={this.routeHandler}
                        />
                        <small className="form-text text-muted">* A unique name for your profile URL, It will help members to find you</small>
                        {errors.route && <div className="invalid-feedback">{errors.route}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.profession})}
                            placeholder="Your profession"
                            name="profession"
                            value={this.state.profession}
                            onChange={this.professionHandler}
                        />
                        <small className="form-text text-muted">* What do you do for living?</small>
                        {errors.profession && <div className="invalid-feedback">{errors.profession}</div>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.location})}
                            placeholder="Location"
                            name="location"
                            value={this.state.location}
                            onChange={this.locationHandler}
                        />
                        <small className="form-text text-muted">Where do you live?</small>
                        {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                    </div>
                    <div className="mb-3">
                        {socialData}
                    <div className='buttons-container'>
                        <input type="submit" className="btn btn-success"/>
                        <a href="/dashboard" className="btn btn-danger">Go Back</a>
                    </div>    
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
    )
  }
}

EditProfile.propTypes = {
    profile: propTypes.object.isRequired,
    errors: propTypes.object.isRequired,
    createProfile: propTypes.func.isRequired,
    getProfile: propTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    profile:state.profile,
    errors:state.errors
});

export default connect(mapStateToProps,{createProfile ,getProfile})(withRouter(EditProfile));
