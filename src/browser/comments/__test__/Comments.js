import { Comments } from '../Comments.react.js';
import Comment from '../Comment.react.js';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import React from 'react';

describe('Comments', () => {

  const commentsDefaultProps = {
    deleteComment: () => {},
    fetchComments: () => {},
    comments: Map()
  };

  it('should render a Comment item per todo', () => {
    const commentList = Map({
      1: {
        id: 1,
        createdBy:'user',
        createdAt:1,
        content: 'First comment'
      },
      2: {
        id: 3,
        createdBy:'user',
        createdAt:1,
        content: 'Second comment'
      }
    });

    const wrapper = shallow(
      <Comments
        {...{
          ...commentsDefaultProps,
          comments: commentList,
        }}/>
    );

    expect(wrapper.find(Comment).length).equal(commentList.size);
  });
});
