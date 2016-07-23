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
		newState = newState.update("newCommentDetails", map=> map.set("username", "user1"));
		const returnedState = reducer(initialState, {type: 'USER_CHANGED', payload:{fieldName:"username", fieldValue:"user1"}});
		expect(returnedState.equals(newState));
	});


	it('Should handle ADD_COMMENT_START', () => {
		newState = newState.update("status", map=> map.set("add", "start"));
		const returnedState = reducer(initialState, {type: 'ADD_COMMENT_START'});
		expect(returnedState.equals(newState));
	});


	it('Should handle ADD_COMMENT_SUCCESS', () => {
		const commentPayload = {id:'1', content:'comment1', createdBy:'user1', createdAt:123};
		let comment = new Comment(commentPayload);
		
		newState = newState.update("commentsMap", map=> map.set(commentPayload.id, comment));
		newState = newState.update("status", map=> map.set("add", "success"));

		const returnedState = reducer(initialState,{type: 'ADD_COMMENT_SUCCESS', payload: {data:commentPayload }});

		expect(returnedState.equals(newState));
	});



	it('Should handle ADD_COMMENT_ERROR', () => {
		newState = newState.update("status", map=> map.set("add", "error"));
		const returnedState = reducer(initialState, {type: 'ADD_COMMENT_ERROR'});
		expect(returnedState.equals(newState));
	});


	it('Should handle FETCH_COMMENTS_START', () => {
		newState = newState.update("status", map=> map.set("fetch", "start"));
		const returnedState = reducer(initialState, {type: 'FETCH_COMMENTS_START'});
		expect(returnedState.equals(newState));
	});


	it('Should handle FETCH_COMMENTS_SUCCESS', () => {
		const comments = [{id:'1', content:'comment1', createdBy:'user1', createdAt:123},
		{id:'2', content:'comment2', createdBy:'user1', createdAt:1223},
		{id:'3', content:'comment3', createdBy:'user2', createdAt:1243},
		]

		newState = newState.update("commentsMap", map=> map.set(comments[0].id, comments[0]));
		newState = newState.update("commentsMap", map=> map.set(comments[1].id, comments[1]));
		newState = newState.update("commentsMap", map=> map.set(comments[2].id, comments[2]));
		newState = newState.update("status", map=> map.set("fetch", "success"));


		let response = {
			data: comments
		};

		const returnedState = reducer(initialState, {type: 'FETCH_COMMENTS_SUCCESS', payload: response});
		expect(returnedState.equals(newState));
	});


	it('Should handle FETCH_COMMENTS_ERROR', () => {
		newState = newState.update("status", map=> map.set("fetch", "error"));
		const returnedState = reducer(initialState, {type: 'FETCH_COMMENTS_ERROR'});
		expect(returnedState.equals(newState));
	});


	it('Should handle DELETE_COMMENT_START', () => {
		newState = newState.update("status", map=> map.set("delete", "start"));
		const returnedState = reducer(initialState, {type: 'DELETE_COMMENT_START'});
		expect(returnedState.equals(newState));
	});


	it('Should handle DELETE_COMMENT_SUCCESS', () => {
		const commentPayload = {id:'1', content:'comment1', createdBy:'user1', createdAt:123};
		let comment = new Comment(commentPayload);
		initialState = initialState.update("commentsMap", map=> map.set(commentPayload.id, comment));
		
		newState = newState.update("status", map=> map.set("delete", "success"));

		const returnedState = reducer(initialState,{type: 'DELETE_COMMENT_SUCCESS', payload: commentPayload.id});

		expect(returnedState.equals(newState));
	});


	it('Should handle DELETE_COMMENT_ERROR', () => {
		newState = newState.update("status", map=> map.set("delete", "error"));
		const returnedState = reducer(initialState, {type: 'DELETE_COMMENT_ERROR'});
		expect(returnedState.equals(newState));
	});



	it('Should handle EDIT_COMMENT_START', () => {
		newState = newState.update("status", map=> map.set("edit", "start"));
		const returnedState = reducer(initialState, {type: 'EDIT_COMMENT_START'});
		expect(returnedState.equals(newState));
	});


	it('Should handle EDIT_COMMENT_SUCCESS', () => {
		const commentPayload = {id:'1', content:'comment1', createdBy:'user1', createdAt:123};
		let comment = new Comment(commentPayload);
		initialState = initialState.update("commentsMap", map=> map.set(commentPayload.id, comment));
		
		newState = newState.update("status", map=> map.set("edit", "success"));
		newState = newState.update("commentsMap", map => map.set(commentPayload.id, {...commentPayload, content:"changedContent"}));

		const returnedState = reducer(initialState,
			{type: 'EDIT_COMMENT_SUCCESS', payload: {...commentPayload, id: commentPayload.id, content:"changedContent"}});

		expect(returnedState.equals(newState));
	});


	it('Should handle EDIT_COMMENT_ERROR', () => {
		newState = newState.update("status", map=> map.set("edit", "error"));
		const returnedState = reducer(initialState, {type: 'EDIT_COMMENT_ERROR'});
		expect(returnedState.equals(newState));
	});



});