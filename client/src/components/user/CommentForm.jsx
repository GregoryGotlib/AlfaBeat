import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import propTypes from 'prop-types';
import classnames from 'classnames';



class CommentForm extends Component {
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
        const postID = this.props.postID;

        const newComment = {
            name: user.name,
            text: this.state.text,
            avatar: user.avatar,
        };

        this.props.addComment(postID,newComment);
        this.setState({text:''});
    }

  render() {
      const errors = this.state.errors;
    return (
        <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-dark text-white">
                Write New Comment
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <textarea className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.text
                        })}
                        placeholder="Comment on this post"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <small className="form-text text-muted"></small>
                    {errors.text && <div className="invalid-feedback">{errors.text}</div>}
                   </div>
                  <button type="submit" className="btn btn-success">Add Comment</button>
                </form>
              </div>
            </div>
        </div>

    )
  }
}

CommentForm.propTypes = {
    errors: propTypes.object.isRequired,
    addComment: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    postID: propTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
  });
  

export default connect(mapStateToProps,{addComment})(CommentForm);