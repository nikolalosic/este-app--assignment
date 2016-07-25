import { Record } from '../transit';

const Comment = Record({
	createdBy: '',
	createdAt: null,
	id: '',
	content: ''
}, 'comment');

export default Comment;
