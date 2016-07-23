import './Comments.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import cx from 'classnames'; // used for easy className maniuplation a, b, {c : true}, {d:false} => a b c
import { connect } from 'react-redux';
import { fetchComments,deleteComment, editComment } from '../../common/comments/actions';
import Comment from './Comment.react';

// container component
export class Comments extends Component {

  static propTypes = {
    deleteComment: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired,
    comments: PropTypes.object.isRequired,
    editComment: PropTypes.func.isRequired
  };

  componentDidMount(){
    const {fetchComments} = this.props;
    fetchComments();
  }

  render() {
    const { deleteComment, fetchComments, comments, editComment } = this.props;

    if (!comments.size) {
      //TODO: add real message
      return <p>"No comments"</p>;
      //return <p><FormattedMessage {...todosMessages.empty} /></p>;
    }
    const list = comments.toList().sortBy(item => item.createdAt).reverse();
    return (
      <ol className="comments">
       {list.map(com => <Comment editComment={editComment} fetchComments={fetchComments} deleteComment={deleteComment} comment={com} key={com.id} />)}
      </ol>
      );
  }

}


export default connect(state => ({
  comments: state.comments.commentsMap
}), { fetchComments, deleteComment, editComment })(Comments);
