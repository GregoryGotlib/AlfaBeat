import React, { Component } from 'react';
import propTypes from 'prop-types';
import PostData from './PostData';

export default class PostFeed extends Component {
  render() {
    const posts = this.props.posts;
    console.log(posts);
    return (    
        posts.map(post=> <PostData key={post._id} post={post}/>)
    )
  }
}

PostFeed.propTypes = {
    posts: propTypes.array.isRequired,
};