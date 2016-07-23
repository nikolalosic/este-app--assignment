 import Comments  from '../Comments.react.js';
import Comment from '../Comment.react.js';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import React from 'react';
import CommentNotification from '../CommentNotification.react';
import CommentForm from '../CommentForm.react.js';
import CommentBox from '../CommentBox.react';

describe('CommentBox', () => {


  it('should render a CommentBox', () => {
  
    const wrapper = shallow(
      <CommentBox/>
    );
     
    expect(wrapper.find(CommentNotification).length).equal(1);
    expect(wrapper.find(CommentForm).length).equal(1);
    expect(wrapper.find(Comments).length).equal(1);

  });
});
