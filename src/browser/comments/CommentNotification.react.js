import './CommentNotification.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { fields } from '../../common/lib/redux-fields';
import {connect} from 'react-redux';
import {addComment} from '../../common/comments/actions'
import newCommentMessages from '../../common/comments/newCommentMessages'
import cx from 'classnames';
import FormattedMessage from 'react-intl';


export class CommentNotification extends Component {

  static propTypes = {
    status: PropTypes.object.isRequired
  };
  
  constructor() {
    super();
    this.hideNotification = this.hideNotification.bind(this);
    this.state = {
      show: false
    }
  }
  
  hideNotification(e) {
      e.preventDefault();
      this.setState({show: !this.state.show});
  }
  componentWillReceiveProps(props){
    this.setState({show: true}); // to enable closing notification

  }

  render() {   
    let message;
    let status = this.props.status.get("add");
    // TODO: there was some error with formatted message, fix it, this is just to make it work
    message = status === "error" ? 
      newCommentMessages.error.defaultMessage:
      status === "success" ?
      newCommentMessages.success.defaultMessage :
      "";
    
    let className = cx({
      alertBox: true,
      success:  status === "success",
      error: status === "error",
      hidden: !(this.state.show && message)
    }); // state is involved to enable closing notification because we can't change props
    
    return (
      <div className={className}>
        <span className="notification-text">
          {message}
        </span>
        <div> 
          <input className="closeButton" type="button" value="x" onClick={this.hideNotification} /> 
        </div>
      </div>
    )
  }
}

export default connect(state => ({status: state.comments.status}))(CommentNotification); 
