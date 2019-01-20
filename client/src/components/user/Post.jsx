import React, { Component } from 'react'
import { getPost } from '../../actions/post';
import { connect } from 'react-redux';
import PostData from './PostData';
import propTypes from 'prop-types';
import Spinner from '../foundation/Spinner';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {

    componentDidMount(){
        this.props.getPost(this.props.match.params.id);
    }

  render() {
      const post = this.props.post.post;
      const loading = this.props.post.loading;
      let postData;

      if(post === null || Object.keys(post).length === 0 || loading ) {
          postData = <Spinner/>;
      }
      else{
          postData = (
              <div>
                <PostData post={post} displayFormat={false}/>
                <CommentForm postID={post._id}/>
                <CommentFeed postID={post._id} comments={post.comments}/>
              </div>
        );
      }
    return (
      <div className="post">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <a href="/posts" className="btn btn-danger mb-4">Back to posts</a> 
                    {postData}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
    getPost: propTypes.func.isRequired,
    post: propTypes.object.isRequired,
}
const mapStateToProps = (state) =>({
    post: state.post
});

export default connect(mapStateToProps,{getPost})(Post);