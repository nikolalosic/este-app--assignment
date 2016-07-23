import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import React from 'react';
import {UserSelect} from '../UserSelect.react.js';
import { spy } from 'sinon';


describe('UserSelect', () => {

  const userSelectDefaultProps = {
    userChanged: ()=>{},
    newCommentDetails: Map()
  };


  it('should call handleUserChange', () => {
    
  	// NEED TO PASS PARAMETERS :(
    
  	const spiesObject = { handleUserChange: ()=>{} };
    const handleUserChangeSpy = spy(spiesObject, 'handleUserChange');

    const wrapper = shallow(
      <UserSelect
        {...{
          ...userSelectDefaultProps,
          userChanged: spiesObject.handleUserChangeSpy,
        }}/>
    );
    
    wrapper.find('.selectBox').simulate('change');
    expect(handleUserChangeSpy.calledOnce).equal(true);


  });
});



