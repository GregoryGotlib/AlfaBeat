import React, { Component } from 'react'
import propTypes from 'prop-types';
import CommentData from './CommentData';

export default class CommentFeed extends Component {
  render() {
      const comments = this.props.comments;
      const postID = this.props.postID;
       
    return (comments.map(comment =>(
        <CommentData key={comment._id} comment={comment} postID={postID}/>
    )));
  }
}
CommentFeed.propTypes = {
    comments: propTypes.array.isRequired,
    postID: propTypes.string.isRequired,
};


