import {CommentForm} from '../CommentForm.react.js';
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import { Map } from 'immutable';


describe('Comment Form', () => {
  const commentFormDefaultProps = {
    addComment: ()=>{},
    newCommentDetails: Map()
  };


  it('should call handleClick on button click', () => {
    // this test fails because calling addcomment depends on status map
    // and refs property, we can inject map, but refs?
    const spiesObject = { addComment: ()=>{} };
    const addCommentSpy = spy(spiesObject, 'addComment');



    // Use the full dom rendering to test user interactions
    const wrapper = mount(
      <CommentForm
        {...{
          ...commentFormDefaultProps,
          addComment: spiesObject.addComment
        }}/>
    );

    wrapper.find('.button').simulate('click');

    expect(addCommentSpy.calledOnce).equal(true);
  });
});
