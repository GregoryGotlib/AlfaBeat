import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import propTypes from 'prop-types';
import PostForm from './PostForm';
import Spinner from '../foundation/Spinner';
import PostFeed from './PostFeed';
import '../../style/Posts.css';

class Posts extends Component {

  componentDidMount(){
    this.props.getPosts();
  }

  render() {
    const posts = this.props.post.posts;
    const loading = this.props.post.loading;
    let postData;
    
    if(posts === null && loading){
      postData = <Spinner/>
    }
    else{
      postData = <PostFeed posts={posts}/>;
    }

    return (
      <div className="feed">
          <div className="posts-container">
            <PostForm/>
            {postData}
          </div>
      </div>
    )
  }
}

Posts.propTypes = {
  post: propTypes.object.isRequired,
  getPosts: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps,{getPosts})(Posts);