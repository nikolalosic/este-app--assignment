import * as actions from './actions';
import Comment from './comment';
import { Map } from 'immutable';
import { Record } from '../transit';

const InitialState = Record({
  status: Map(),
  commentsMap: Map(),
  newCommentDetails: Map()
}, 'comments');

export default function commentsReducer(state = new InitialState, action) {
  switch (action.type) {

    case actions.USER_CHANGED: {
      return state.update('newCommentDetails', map=>map.set(action.payload.fieldName, action.payload.fieldValue));
    }
    
    case actions.ADD_COMMENT_START: {
      return state.update('status', map=>map.set("add", "start"));
    }

    case actions.ADD_COMMENT_SUCCESS: {
      if(!action.payload ) return state;
      const comment = new Comment(action.payload.data);
      state = state.update('commentsMap', map => map.set(comment.id, comment));
      return state.update('status', map=>map.set("add", "success"));

    }

    case actions.ADD_COMMENT_ERROR: {
     return state.update('status', map=>map.set("add", "error"));
   } 

   case actions.FETCH_COMMENTS_START: {
    return state.update('status', map=>map.set("fetch", "start"));

  }

  case actions.FETCH_COMMENTS_SUCCESS : {

    if(!action.payload ) return state;
    const comments = action.payload.data.reduce((comments, json) =>
      comments.set(json.id, new Comment(json))
      , Map());
    state = state.update('commentsMap', map=> map.clear());
    state = state.update('commentsMap', map=> map.merge(comments));
    return state.update('status', map=>map.set("fetch", "success"));

  }

  case actions.FETCH_COMMENTS_ERROR: {
    return state.update('status', map=>map.set("fetch", "error"));
  }

  case actions.DELETE_COMMENT_SUCCESS: {
    if(!action.payload ) return state;
    const { id } = action.payload;
    return state.update('commentsMap', map => map.delete(id));
  }


  case actions.DELETE_COMMENT_START: {
    return state.update('status', map=>map.set("delete", "start"));
  }



  case actions.DELETE_COMMENT_ERROR: {
   return state.update('status', map=>map.set("delete", "error"));
 }


}

return state;
}
