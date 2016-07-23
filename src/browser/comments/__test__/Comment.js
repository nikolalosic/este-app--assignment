import Comment from '../Comment.react.js';
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';

describe('Comment', () => {
  const commentDefaultProps = {
    deleteComment: ()=>{},
    fetchComments: ()=>{},
    editComment: ()=>{},
    comment: {id:1, content:'c1', createdBy:'user', createdAt:11}
  } 

  it('should call onDeleteButtonClick on button click', () => {
    const spiesObject = { deleteComment: ()=>{}};
    const deleteCommentSpy = spy(spiesObject, 'deleteComment');


    // Use the full dom rendering to test user interactions
    const wrapper = mount(
      <Comment
        {...{
          ...commentDefaultProps,
          deleteComment: spiesObject.deleteComment,
        }}/>
    );

    wrapper.find('.button').simulate('click');

    expect(deleteCommentSpy.calledOnce).equal(true);
  });



  it('should call editComment on button click', () => {
    const spiesObject = { editComment: ()=>{}};
    const editCommentSpy = spy(spiesObject, 'editComment');


    // Use the full dom rendering to test user interactions
    const wrapper = mount(
      <Comment
        {...{
          ...commentDefaultProps,
          editComment: spiesObject.editComment
        }}/>
    );

    wrapper.find('.modalSave').simulate('click');

    expect(editCommentSpy.calledOnce).equal(true);
  });


});
