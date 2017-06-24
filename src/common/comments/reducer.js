import * as actions from './actions';
import Comment from './comment';
import { Map } from 'immutable';
import { Record } from '../transit';
import * as actionTypes from './actionTypes';


const InitialState = Record({
  status: Map(),
  commentsMap: Map(),
  newCommentDetails: Map()
}, 'comments');

export default function commentsReducer(state = new InitialState, action) {
  switch (action.type) {

    case actionTypes.USER_CHANGED: {
      return state.update('newCommentDetails', map=>map.set(action.payload.fieldName, action.payload.fieldValue));
    }
    
    case actionTypes.ADD_COMMENT_START: {
      return state.update('status', map=>map.set("add", "start"));
    }

    case actionTypes.ADD_COMMENT_SUCCESS: {
      return state.update('status', map=>map.set("add", "success"));
    }

    case actionTypes.ADD_COMMENT_ERROR: {
     return state.update('status', map=>map.set("add", "error"));
   } 

   case actionTypes.FETCH_COMMENTS_START: {
    return state.update('status', map=>map.set("fetch", "start"));

  }

  case actionTypes.FETCH_COMMENTS_SUCCESS : {
    if(!action.payload ) return state;
    const comments = action.payload.data.reduce((comments, json) =>
      comments.set(json.id, new Comment(json))
      , Map());
    state = state.update('commentsMap', map=> map.clear());
    state = state.update('commentsMap', map=> map.merge(comments));
    return state.update('status', map=>map.set("fetch", "success"));

  }

  case actionTypes.FETCH_COMMENTS_ERROR: {
    return state.update('status', map=>map.set("fetch", "error"));
  }

  case actionTypes.DELETE_COMMENT_SUCCESS: {
    if(!action.payload ) return state;
    const { id } = action.payload;
    return state.update('commentsMap', map => map.delete(id));
  }


  case actionTypes.DELETE_COMMENT_START: {
    return state.update('status', map=>map.set("delete", "start"));
  }



  case actionTypes.DELETE_COMMENT_ERROR: {
   return state.update('status', map=>map.set("delete", "error"));
 }


}

return state;
}
