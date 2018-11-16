import React from 'react';
import {
  shallow,
} from 'enzyme';
import { SwitchedNetworksModal } from '../Modals';

describe('SwitchedNetworksModal component', () => {
  it('switches modal off', () => {
    const wrapper = shallow(<SwitchedNetworksModal />);
    const closeModal = wrapper.find('button');
    closeModal.simulate('click');
    const text = wrapper.find('p').text();
    expect(text).toEqual('Current count: 1');
  });
});
