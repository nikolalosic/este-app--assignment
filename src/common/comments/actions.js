import { Range } from 'immutable';
import * as axios from 'axios';
import * as api from './api';
import * as actionTypes from './actionTypes';

export function fetchComments(){
  return {
    type: actionTypes.FETCH_COMMENTS,
    payload: api.fetchComments()
  }

}

export function addComment(content, user) {
  return ({ getUid, now, dispatch }) => ({
    type: actionTypes.ADD_COMMENT,
    payload: api.addComment(content, user, getUid, now)
    .then((response)=>{
     dispatch(fetchComments());
   })
  });
}


export function editComment(comment, newContent) {
  return ({dispatch}) => ({
    type: actionTypes.EDIT_COMMENT,
    payload: api.editComment(comment, newContent)
    .then((response)=>{
     dispatch(fetchComments());
   })
  });
}

export function deleteComment(id) {
  return ({dispatch}) => ({
    type: actionTypes.DELETE_COMMENT,
    payload: api.deleteComment(id)
    .then((response)=>{
     dispatch(fetchComments());
   })
  });
}



export function userChanged(newUser){
  return {
    type: actionTypes.USER_CHANGED,
    payload: {
      fieldName: 'username',
      fieldValue: newUser
    }

  };
}
