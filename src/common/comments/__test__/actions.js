import * as actions from '../actions.js';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {promiseMiddleware} from '../../configureMiddleware';
import moxios from 'moxios';

const middlewares = [ promiseMiddleware ];
const mockStore = configureMockStore(middlewares);


function getActionsFromStore(actions) {
    var formattedActions = [];
    for(var action of actions){
      if(action.payload && action.payload.data) {
          formattedActions.push({type: action.type, payload: action.payload.data});
      }else{
        formattedActions.push({type: action.type});
      }
    }
    return formattedActions;
};


describe('comments actions', () => {

    beforeEach(function () {
      moxios.install()
    })

    afterEach(function () {
      moxios.uninstall()
    })

  it('creates FETCH_COMMENTS_SUCCESS when fetching comments has been done', () => {
    moxios.stubRequest('http://localhost:3000/comments/',
    {
      status:200,
      responseText: 'test'
    })
    const expectedActions = [
      { type: actions.FETCH_COMMENTS_START },
      { type: actions.FETCH_COMMENTS_SUCCESS,  payload: "test" }
    ];
    const store = mockStore({ comments: [] });
    return store.dispatch(actions.fetchComments())
      .then(() => { 
          let storeActions = getActionsFromStore(store.getActions());
          expect(storeActions).to.eql(expectedActions);
      });
  })


 it('creates FETCH_COMMENTS_ERROR when fetching comments has error', () => {
    moxios.stubRequest('http://localhost:3000/comments/',
    {
      status:404,
    })
    const expectedActions = [
      { type: actions.FETCH_COMMENTS_START },
      { type: actions.FETCH_COMMENTS_ERROR }
    ];
    const store = mockStore({ comments: [] });
    return store.dispatch(actions.fetchComments())
      .then(() => { 
         expect(1).to.eql(2);
      })
      .catch(()=>{
          let storeActions = getActionsFromStore(store.getActions());
          expect(storeActions).to.eql(expectedActions);
        }
      )
  });



  it('creates ADD_COMMENT_SUCCESS when adding comment has been done', () => {
    moxios.stubRequest('http://localhost:3000/comments/',
    {
      status:201,
      response: {id:1, content:'content', createdBy:'user'}
    })
    const expectedActions = [
      { type: actions.ADD_COMMENT_START },
      { type: actions.ADD_COMMENT_SUCCESS,  payload: {id:1, content:'content', createdBy:'user'} }
    ];
    const deps = {
      getUid: () => 1,
      now: () => 2
    };
    const store = mockStore({ comments: [] });
    return store.dispatch(actions.addComment('content', 'user')(deps))
      .then(() => { 
          let storeActions = getActionsFromStore(store.getActions());
          expect(storeActions).to.eql(expectedActions);
        }
      )
  })


 it('creates ADD_COMMENT_ERROR when adding comment has error', () => {
    moxios.stubRequest('http://localhost:3000/comments/',
    {
      status:403,
    })
    const expectedActions = [
      { type: actions.ADD_COMMENT_START },
      { type: actions.ADD_COMMENT_ERROR }
    ];
    const store = mockStore({ comments: [] });
     const deps = {
      getUid: () => 1,
      now: () => 2
    };
    return store.dispatch(actions.addComment('content', 'user')(deps))
      .then(() => { 
         expect(1).to.eql(2);
      })
      .catch(()=>{
          let storeActions = getActionsFromStore(store.getActions());
          expect(storeActions).to.eql(expectedActions);
        }
      )
  })



  it('creates DELETE_COMMENT_SUCCESS when deleting comments has been done', () => {
    moxios.stubRequest('http://localhost:3000/comments/1',
    {
      status:200,
    })
    const expectedActions = [
      { type: actions.DELETE_COMMENT_START },
      { type: actions.DELETE_COMMENT_SUCCESS}
    ];
    const store = mockStore({ comments: [] });
    return store.dispatch(actions.deleteComment(1))
      .then(() => { 
          let storeActions = getActionsFromStore(store.getActions());
          expect(storeActions).to.eql(expectedActions);
      });
  })


 it('creates DELETE_COMMENT_ERROR when deleting comments has error', () => {
    moxios.stubRequest('http://localhost:3000/comments/1',
    {
      status:404,
    })
    const expectedActions = [
      { type: actions.DELETE_COMMENT_START },
      { type: actions.DELETE_COMMENT_ERROR }
    ];
    const store = mockStore({ comments: [] });
    return store.dispatch(actions.deleteComment(1))
      .then(() => { 
         expect(1).to.eql(2);
      })
      .catch(()=>{
          let storeActions = getActionsFromStore(store.getActions());
          expect(storeActions).to.eql(expectedActions);
        }
      )
  })



 it('creates EDIT_COMMENT_SUCCESS when editing comment has been done', () => {
    moxios.stubRequest('http://localhost:3000/comments/1',
    {
      status:200,
    })
    const expectedActions = [
      { type: actions.EDIT_COMMENT_START },
      { type: actions.EDIT_COMMENT_SUCCESS}
    ];
    const store = mockStore({ comments: [] });
    return store.dispatch(actions.editComment({id:1, content:"ab"}))
      .then(() => { 
          let storeActions = getActionsFromStore(store.getActions());
          expect(storeActions).to.eql(expectedActions);
      });
  })


 it('creates EDIT_COMMENT_ERROR when editing comments has error', () => {
    moxios.stubRequest('http://localhost:3000/comments/1',
    {
      status:404,
    })
    const expectedActions = [
      { type: actions.EDIT_COMMENT_START },
      { type: actions.EDIT_COMMENT_ERROR }
    ];
    const store = mockStore({ comments: [] });
    return store.dispatch(actions.editComment({id:1, content:"ab"}))
      .then(() => { 
         expect(1).to.eql(2);
      })
      .catch(()=>{
          let storeActions = getActionsFromStore(store.getActions());
          expect(storeActions).to.eql(expectedActions);
        }
      )
  })




})
