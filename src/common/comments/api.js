import * as axios from 'axios';


const rootUrl = 'http://localhost:3000/';
const url = rootUrl+'comments/';

export function fetchComments() {
  return axios.get(url);
}

export function addComment(content, user, getUid, now) {
  return axios.post(url,
  {
    id:now(),
    createdAt: now(),
    createdBy: user,
    content: content.trim()  
  });
}

export function deleteComment(id) {
  return axios.delete(url  + id);
}

export function editComment(comment, newContent) {
	return axios.put(url + comment.id, 
  {
   content: newContent,
   id: comment.id,
   createdAt: comment.createdAt,
   createdBy: comment.createdBy
 },

 {
   headers: {'Content-Type': 'application/json'}
 });
}