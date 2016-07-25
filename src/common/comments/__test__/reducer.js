import reducer  from '../reducer.js';
import { expect } from 'chai';
import { Map, Record } from 'immutable';
import Comment from '../comment.js';

const InitialState = Record({
	status: Map(),
	commentsMap: Map(),
	newCommentDetails: Map()
}, 'comments');


describe('Comments Reducer', () => {

	var initialState, newState;

	beforeEach(function() {
		initialState = new InitialState;
		newState = new InitialState;
	});

	it('Should handle USER_CHANGED', () => {
		newState = newState.update("newCommentDetails", map => map.set("username", "user1"));
		const returnedState = reducer(initialState, 
			{type: 'USER_CHANGED', payload: {fieldName:"username", fieldValue:"user1"}});
		expect(returnedState).to.eql(newState);
	});

	it('Should handle ADD_COMMENT_START', () => {
		newState = newState.update("status", map => map.set("add", "start"));
		const returnedState = reducer(initialState, {type: 'ADD_COMMENT_START'});
		expect(returnedState.status).to.eql(newState.status);
	});

	it('Should handle ADD_COMMENT_SUCCESS', () => {
		const commentPayload = {id: '1', content: 'comment1', createdBy: 'user1', createdAt: 123};
		let comment = new Comment(commentPayload);
		
		newState = newState.update("commentsMap", map => map.set(commentPayload.id, comment));
		newState = newState.update("status", map => map.set("add", "success"));

		const returnedState = reducer(initialState,
			{type: 'ADD_COMMENT_SUCCESS', payload: {data:commentPayload }});

		expect(returnedState.status).to.eql(newState.status);
	});

	it('Should handle ADD_COMMENT_ERROR', () => {
		newState = newState.update("status", map => map.set("add", "error"));
		const returnedState = reducer(initialState, {type: 'ADD_COMMENT_ERROR'});
		expect(returnedState.status).to.eql(newState.status);
	});

	it('Should handle FETCH_COMMENTS_START', () => {
		newState = newState.update("status", map => map.set("fetch", "start"));
		const returnedState = reducer(initialState, {type: 'FETCH_COMMENTS_START'});
		expect(returnedState.status).to.eql(newState.status);
	});

	it('Should handle FETCH_COMMENTS_SUCCESS', () => {
		const comments = [{id: '1', content: 'comment1', createdBy: 'user1', createdAt: 1},
						  {id: '2', content: 'comment2', createdBy: 'user1', createdAt: 2},
						  {id: '3', content: 'comment3', createdBy: 'user2', createdAt: 3},
		]

		newState = newState.update("commentsMap", map => map.set(comments[2].id, new Comment(comments[2])));
		newState = newState.update("commentsMap", map => map.set(comments[1].id, new Comment(comments[1])));
		newState = newState.update("commentsMap", map => map.set(comments[0].id, new Comment(comments[0])));
		newState = newState.update("status", map => map.set("fetch", "success"));


		let response = {
			data: comments
		};

		const returnedState = reducer(initialState, {type: 'FETCH_COMMENTS_SUCCESS', payload: response});

		expect(returnedState.status).to.eql(newState.status);
		expect(returnedState.commentsMap.get("1")).to.eql(newState.commentsMap.get("1"));
		expect(returnedState.commentsMap.get("2")).to.eql(newState.commentsMap.get("2"));
		expect(returnedState.commentsMap.get("3")).to.eql(newState.commentsMap.get("3"));
	});

	it('Should handle FETCH_COMMENTS_ERROR', () => {
		newState = newState.update("status", map => map.set("fetch", "error"));
		const returnedState = reducer(initialState, {type: 'FETCH_COMMENTS_ERROR'});
		expect(returnedState).to.eql(newState);
	});

	it('Should handle DELETE_COMMENT_START', () => {
		newState = newState.update("status", map => map.set("delete", "start"));
		const returnedState = reducer(initialState, {type: 'DELETE_COMMENT_START'});
		expect(returnedState).to.eql(newState);
	});

	it('Should handle DELETE_COMMENT_SUCCESS', () => {
		const commentPayload = {id: '1', content: 'comment1', createdBy: 'user1', createdAt: 123};
		let comment = new Comment(commentPayload);
		initialState = initialState.update("commentsMap", map => map.set(commentPayload.id, comment));
		
		newState = newState.update("status", map => map.set("delete", "success"));
		const returnedState = reducer(initialState,{type: 'DELETE_COMMENT_SUCCESS', payload: commentPayload.id});

		expect(returnedState.status).to.eql(newState.status);
	});

	it('Should handle DELETE_COMMENT_ERROR', () => {
		newState = newState.update("status", map => map.set("delete", "error"));
		const returnedState = reducer(initialState, {type: 'DELETE_COMMENT_ERROR'});
		expect(returnedState).to.eql(newState);
	});


	it('Should handle EDIT_COMMENT_START', () => {
		newState = newState.update("status", map => map.set("edit", "start"));
		const returnedState = reducer(initialState, {type: 'EDIT_COMMENT_START'});
		expect(returnedState).to.eql(newState);
	});

	it('Should handle EDIT_COMMENT_SUCCESS', () => {
		const commentPayload = {id: '1', content: 'comment1', createdBy: 'user1', createdAt: 123};
		let comment = new Comment(commentPayload);
		initialState = initialState.update("commentsMap", map => map.set(commentPayload.id, comment));
		newState = newState.update("status", map => map.set("edit", "success"));
		newState = newState.update("commentsMap", map => map.set(commentPayload.id, new Comment(commentPayload)));
		const returnedState = reducer(initialState,
			{type: 'EDIT_COMMENT_SUCCESS', payload: {...commentPayload, id: commentPayload.id, content: "changedContent"}});
		expect(returnedState.status).to.eql(newState.status);
	});

	it('Should handle EDIT_COMMENT_ERROR', () => {
		newState = newState.update("status", map => map.set("edit", "error"));
		const returnedState = reducer(initialState, {type: 'EDIT_COMMENT_ERROR'});
		expect(returnedState).to.eql(newState);
	});

});