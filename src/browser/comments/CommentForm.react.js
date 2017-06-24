import './CommentForm.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import cx from 'classnames'; // used for easy className maniuplation a, b, {c : true}, {d:false} => a b c
import newCommentMessages from '../../common/comments/newCommentMessages';
import { FormattedMessage } from 'react-intl';
import { fields } from '../../common/lib/redux-fields';
import {connect} from 'react-redux';
import {addComment} from '../../common/comments/actions'


export class CommentForm extends Component {

  static propTypes = {
    addComment: PropTypes.func.isRequired,
    newCommentDetails: PropTypes.object.isRequired
  };

  constructor() {
  	super();
  	this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const username = this.props.newCommentDetails.get("username");
    if(!username || username === "NONE"  || this.refs.commentInput.value === "") return;
    const {addComment} = this.props;
    addComment(this.refs.commentInput.value, username);
    //fetchComments?
  }

  render() {
    const {addComment} = this.props;
    return (
      <div className="commentForm">
        <textarea ref="commentInput"
          type="text"      
          autoFocus
          className="newComment"
          placeholder={"Enter"}/> 
        <br/>
          <button className="button" onClick={this.handleClick}>
            Submit
          </button>
      </div>
      
      )
  }
}

export default connect(state => ({newCommentDetails: state.comments.newCommentDetails}), { addComment })(CommentForm); 
