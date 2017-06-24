import { defineMessages } from 'react-intl';

export default defineMessages({
 placeholder: {
    "id": "comments.newComment.placeholder", // added for new comment
    "defaultMessage": "Enter your message?"
  },

  success: {
  	"id": "comments.newComment.success",
  	"defaultMessage": "SUCCESS: Your message is saved!"
  },
  
  error: {
    "id": "comments.newComment.error",
    "defaultMessage": "ERROR: There was some error!"	
  },

  notice: {
    "id": "comments.newComment.notice",
    "defaultMessage": "NOTICE: We are saving your message!"	
  }

});
