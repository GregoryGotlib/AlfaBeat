import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';
import { likePost } from '../../actions/post';
import { removeLike } from '../../actions/post';
import propTypes from 'prop-types';
import classnames from 'classnames';
import '../../style/PostData.css';

class PostData extends Component {

deleteHandler = (postID) =>{
    this.props.deletePost(postID);
}

likeHandler = (postID) =>{
    this.props.likePost(postID);
}

unLikeHandler = (postID) =>{
    this.props.removeLike(postID);
}

likeSelector = (likesArray) =>{
    
    if(likesArray.filter(userLike => userLike.user === this.props.auth.user.id ).length>0){
        return true;
    }
    return false;
}

  render() {
      const post = this.props.post;
      const auth = this.props.auth;
      const displayFormat = this.props.displayFormat;

    return (
    <div className="card card-body mb-3" id='post-card'>
        <div className="post-wrapper">
            <div className="publisher-data">
                <a href="/profile">
                <img className="rounded-circle" src={post.avatar}alt="" id='publisher-avatar'/>
                </a>
                <br/>
                <p className="text-center">{post.name}</p>
            </div>
            <hr className='post-line'/>
            <div className="post-data">
                <p className="lead">{post.text}</p>

                {displayFormat ? (<span><button onClick={()=> this.likeHandler(post._id)} type="button" className="btn btn-light mr-1">
                <i className={classnames('fas fa-thumbs-up', {
                    'text-info': this.likeSelector(post.likes)
                })}></i>
                <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button onClick={()=> this.unLikeHandler(post._id)} type="button" className="btn btn-light mr-1">
                <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <a href={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
                </a>
                {post.user === auth.user.id? (
                <button className="btn btn-danger mr-1" type="button" onClick={() => this.deleteHandler(post._id)}><i className="fas fa-times"/> Delete Post</button>
                ): null}</span>) : null}
            </div>
        </div>
    </div>
    )
  }
}

PostData.defaultProps = {
    displayFormat: true
}

PostData.propTypes = {
    auth: propTypes.object.isRequired,
    post: propTypes.object.isRequired,
    deletePost: propTypes.func.isRequired,
    removeLike: propTypes.func.isRequired,
    likePost: propTypes.func.isRequired
};

const mapStateToProps = (state) =>({
auth: state.auth
});

export default connect(mapStateToProps,{deletePost, removeLike, likePost})(PostData); 