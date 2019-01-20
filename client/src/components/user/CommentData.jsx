import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import propTypes from 'prop-types';

class CommentData extends Component {

    deleteHandler = (postID,commentID)=>{
        this.props.deleteComment(postID,commentID);
    }

  render() {
    const auth = this.props.auth;
    const comment = this.props.comment;
    const postID = this.props.postID;
    
    return (
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-2">
                    <a href="/profile">
                    <img class="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                    </a>
                    <br />
                    <p class="text-center">{comment.name}</p>
                </div>
                <div class="col-md-10">
                    <p class="lead">{comment.text}</p>
                {comment.user === auth.user.id? (
                <button className="btn btn-danger mr-1" type="button" onClick={() => this.deleteHandler(postID,comment._id)}><i className="fas fa-times"/> Delete Comment</button>
                ): null}
                </div>
            </div>
        </div>
    )
  }
}

CommentData.propTypes = {
    auth: propTypes.object.isRequired,
    comment: propTypes.object.isRequired,
    postID: propTypes.string.isRequired,
    deleteComment: propTypes.func.isRequired,    
};

const mapStateToProps =(state) =>({
    auth:state.auth
})

export default connect(mapStateToProps,{deleteComment})(CommentData);