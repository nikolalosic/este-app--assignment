const promiseSuccessSuffix = "SUCCESS";
const promiseStartSuffix = "START";
const promiseErrorSuffix = "ERROR";

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_START = `ADD_COMMENT_${promiseStartSuffix}`;
export const ADD_COMMENT_SUCCESS =`ADD_COMMENT_${promiseSuccessSuffix}`;
export const ADD_COMMENT_ERROR = `ADD_COMMENT_${promiseErrorSuffix}`;

export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_COMMENT_START = `EDIT_COMMENT_${promiseStartSuffix}`;
export const EDIT_COMMENT_SUCCESS = `EDIT_COMMENT_${promiseSuccessSuffix}`;
export const EDIT_COMMENT_ERROR = `EDIT_COMMENT_${promiseErrorSuffix}`;

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_START = `DELETE_COMMENT_${promiseStartSuffix}`;
export const DELETE_COMMENT_SUCCESS = `DELETE_COMMENT_${promiseSuccessSuffix}`;
export const DELETE_COMMENT_ERROR = `DELETE_COMMENT_${promiseErrorSuffix}`;

export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const FETCH_COMMENTS_START = `FETCH_COMMENTS_${promiseStartSuffix}`;
export const FETCH_COMMENTS_SUCCESS = `FETCH_COMMENTS_${promiseSuccessSuffix}`;
export const FETCH_COMMENTS_ERROR = `FETCH_COMMENTS_${promiseErrorSuffix}`;

export const USER_CHANGED = 'USER_CHANGED';