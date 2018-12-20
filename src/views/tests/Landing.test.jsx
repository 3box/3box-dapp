/* eslint-env jest */

import React from 'react';
import {
  shallow,
} from 'enzyme';

import LandingBody from '../../components/LandingBody';
import Footer from '../../components/Footer';

test('render landing body', () => {
  const wrapper = shallow(<LandingBody />);
  expect(wrapper).toMatchSnapshot();
});

test('render landing body', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper).toMatchSnapshot();
});
