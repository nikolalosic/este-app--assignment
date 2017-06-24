import './UserSelect.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import cx from 'classnames'; // used for easy className maniuplation a, b, {c : true}, {d:false} => a b c
import {connect} from 'react-redux';
import {userChanged} from '../../common/comments/actions';
import { fields } from '../../common/lib/redux-fields';


export class UserSelect extends Component {

  static propTypes = {
    userChanged: PropTypes.func.isRequired,
    newCommentDetails: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.handleUserChange = this.handleUserChange.bind(this);

  }

  handleUserChange(e) {
    e.preventDefault();
    const {userChanged} = this.props;
    userChanged(e.target.value); // no need for reset, we wan't last user selecter
  }

  render() {
    return (
      <div className="userSelect">
        <div>Comment As:</div>
        <select className="selectBox" defaultValue="NONE" onChange={this.handleUserChange.bind(this)} >
          <option value="NONE"></option>
          <option value="User1">User1</option>
          <option value="User2">User2</option>
          <option value="User3">User3</option>
        </select>
      </div>
      );
  }

}

export default connect( state=>({newCommentDetails: state.comments.newCommentDetails}),
  {userChanged})(UserSelect); 
