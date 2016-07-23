
import {CommentNotification} from '../CommentNotification.react.js';
import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import sinon, { spy } from 'sinon';
import { Map } from 'immutable';
import { spyOnComponentMethod, stubComponentMethod } from 'sinon-spy-react';



describe('Comment Notification', () => {
  

  const commentNotificationDefaultProps = {
    status: Map()
  };


  it('should call hideNotification on button click', () => {

//    Unfortunately, sinon.spy(componentClass.prototype, "methodName") doesn't work if you're transpiling code.


    var hideNotificationStub = sinon.stub(CommentNotification.prototype.__reactAutoBindMap, "hideNotification(e)");
    
    // Use the full dom rendering to test user interactions
    const wrapper = mount(
      <CommentNotification
        {...{
          ...commentNotificationDefaultProps
        }}/>
    );

    wrapper.find('.closeButton').simulate('click');
    sinon.assert.called(stub); 
    //expect(hideNotificationStub.calledOnce).equal(true);
  });
});















