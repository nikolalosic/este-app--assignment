import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { injectIntl, intlShape } from 'react-intl';
import UserSelect from './UserSelect.react';
import CommentBox from './CommentBox.react';
import './CommentsPage.scss';

export class CommentsPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage(linksMessages.comments); // get title from messages
    return (
      <div className="commentsPage">
        <Helmet title={title} />
        <div className="container">
        <div className="wrapper">
          <UserSelect />
          <CommentBox/>
          </div>
        </div>
       </div>
    );
  }

}

export default injectIntl(CommentsPage);
   