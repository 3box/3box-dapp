import React from 'react';
import {
  Provider
} from 'react-redux';
import {
  mount
} from 'enzyme';

import reducers from '../../state/reducers';
// import App from '../../App';

/** @jsx React.DOM */

test('Test Edit', () => {
  expect(true).toBeTruthy();
});

// describe('integration tests', () => {
//   let store;
//   let dispatchSpy;
//   let router;

//   beforeEach(() => {
//     router = {
//       params: {
//         myParam: 'any-params-you-have',
//       },
//     };
//     ({
//       store,
//       dispatchSpy,
//     } = setupIntegrationTest({
//       reducers,
//     }));
//   });

//   it('should change the text on click', () => {
//     const sut = mount(
//       <Provider store = {
//         store
//       }>
//       <MyComponent / >
//       </Provider>
//     );

//     sut.find('div').simulate('click');

//     expect(sut.find('div').prop('children')).toEqual('new text');
//   });
// });
