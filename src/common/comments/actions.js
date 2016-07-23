import { Range } from 'immutable';
import * as axios from 'axios';
import * as api from './api';

export const ADD_COMMENT = 'ADD_COMMENT';

export const ADD_COMMENT_START = 'ADD_COMMENT_START';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export const DELETE_COMMENT = 'DELETE_COMMENT';

export const EDIT_COMMENT = 'EDIT_COMMENT';


export const EDIT_COMMENT_START = 'EDIT_COMMENT_START';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_ERROR = 'EDIT_COMMENT_ERROR';

export const DELETE_COMMENT_START = 'DELETE_COMMENT_START';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

export const FETCH_COMMENTS = "FETCH_COMMENTS";

export const FETCH_COMMENTS_START = "FETCH_COMMENTS_START";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_ERROR = "FETCH_COMMENTS_ERROR";

export const USER_CHANGED = 'USER_CHANGED';

export function fetchComments(){
  return {
    type: FETCH_COMMENTS,
    payload: api.fetchComments()

  }

}

export function addComment(content, user) {
  return ({ getUid, now }) => ({
    type: ADD_COMMENT,
    payload: api.addComment(content, user, getUid, now)
  });
}


export function editComment(comment, newContent) {
  return {
    type: EDIT_COMMENT,
    payload: api.editComment(comment, newContent)
  };
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    payload: api.deleteComment(id)
  };
}



export function userChanged(newUser){
  return {
    type: USER_CHANGED,
    payload: {
      fieldName: 'username',
      fieldValue: newUser
    }
  
  };
}
