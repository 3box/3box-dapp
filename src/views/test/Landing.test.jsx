import React from 'react';
import {
  shallow,
} from 'enzyme';

import LandingBody from '../../components/LandingBody';

test('adds 1 + 2 to equal 3', () => {
  expect(3).toBe(3);
});

describe('<LandingBody />', () => {
  it('should render', () => {
    const wrapper = shallow(<LandingBody />);
    expect(wrapper);
  });
});
