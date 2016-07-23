import * as axios from 'axios';


export function fetchComments(){
    return axios.get('http://localhost:3000/comments');
}


export function addComment(content, user, getUid, now) {
    return axios.post('http://localhost:3000/comments',
              {
                id:getUid(),
                createdAt: now(),
                createdBy: user,
                content: content.trim()  
              });
 
}

export function deleteComment(id) {
  return axios.delete('http://localhost:3000/comments/' + id);
}
