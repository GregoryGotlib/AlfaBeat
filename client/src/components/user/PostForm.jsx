import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import propTypes from 'prop-types';
import classnames from 'classnames';
import '../../style/PostForm.css';



class PostForm extends Component {
    constructor(props){
        super(props);
    }
    state = {
        text:'',
        errors:{}
    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors:newProps.errors});
        }
    }

    onChange = (event) =>{
        this.setState({text:event.target.value});
    }

    onSubmit = (event) =>{
        event.preventDefault();
        const user = this.props.auth.user;

        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar,
        };

        this.props.addPost(newPost);
        this.setState({text:''});
    }

  render() {
      const errors = this.state.errors;
    return (
        <div className="post-form mb-3">
            <div className="card card-info" id='new-post-card'>
              <div className="card-header bg-dark text-white">
                What is on your mind...?
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <textarea className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.text
                        })}
                        placeholder="Create new post"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <small className="form-text text-muted"></small>
                    {errors.text && <div className="invalid-feedback">{errors.text}</div>}
                   </div>
                  <button type="submit" className="btn btn-success">Add new post</button>
                </form>
              </div>
            </div>
        </div>

    )
  }
}

PostForm.propTypes = {
    errors: propTypes.object.isRequired,
    addPost: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
  });
  

export default connect(mapStateToProps,{addPost})(PostForm);