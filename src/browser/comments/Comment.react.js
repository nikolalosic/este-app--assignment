import './Comment.scss';
import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import cx from 'classnames'; // used for easy className maniuplation a, b, {c : true}, {d:false} => a b c
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)',
    width                 : '600px',
    height                :'70%',
    minHeight             :'430px'
  }
};

// Presentational component.
export default class Comment extends Component {

	static PropTypes = {
		deleteComment: PropTypes.func.isRequired,
		fetchComments: PropTypes.func.isRequired,
		comment: PropTypes.object.isRequired,
		editComment: PropTypes.func.isRequired
	};


	constructor() {
		super();
		this.state = { modalIsOpen: false };
		// bind in constructor so we don't have to do it when dispatching action
		this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.afterOpenModal = this.openModal.bind(this);
		this.saveChanges = this.saveChanges.bind(this);

	}

	onDeleteButtonClick(e) {
		e.preventDefault();
		const { deleteComment, comment, fetchComments } = this.props; // get action and record from props
		deleteComment(comment.id);
	}
	

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		this.refs.subtitle.style.color = '#f00';
	}

	closeModal(e) {
		//e.preventDefault();
		this.setState({modalIsOpen: false});
	}

	saveChanges(e) {
		e.preventDefault();
		const { comment, editComment, fetchComments } = this.props;
		editComment(comment, this.refs.editContent.value);
		this.setState({modalIsOpen: false});
	}

	openModal(e) {
		if(e && e.target.className === "button") return;
		this.setState({modalIsOpen: true});
	}

	render() {
		const { comment, editComment } = this.props;
		return (
			<li className="comment" onClick={this.openModal}>
				<div className="textbox">
					<span className="content">
						{comment.content}
					</span>

					<span className="author">
						Posted by: {comment.createdBy}
					</span>

					<span className="button" onClick={this.onDeleteButtonClick}>
						x
					</span>

				</div>

				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles} >
				
					<h2>Edit comment</h2>
					<textarea className="editComment" ref="editContent" defaultValue={comment.content}></textarea>
					<div className="editButtons">
						<button className="modalButton modalClose" onClick={this.closeModal}>Close</button>
						<button className="modalButton modalSave" onClick={this.saveChanges}>Save</button>
					</div>
				</Modal>
			</li>
			);
	}

}