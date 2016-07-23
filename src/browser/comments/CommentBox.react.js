import './CommentBox.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import cx from 'classnames'; // used for easy className maniuplation a, b, {c : true}, {d:false} => a b c
import CommentForm from './CommentForm.react';
import Comments from './Comments.react';
import CommentNotification from './CommentNotification.react';


export default class CommentBox extends Component {

  render() {
    return (
      <div className="commentBox">
        <CommentNotification/>
        <CommentForm/>
        <Comments/>
      </div>
      );
  }

}
