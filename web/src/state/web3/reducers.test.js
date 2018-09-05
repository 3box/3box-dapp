/* global test, expect */
import { web3Reducer as reducer } from './reducers';
import types from './types';

const initBlockState = {
  web3: null,
};

const connectedBlockState = {
  web3: {},
};

const notConnectedBlockState = {
  web3: null,
};

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initBlockState);
});

test('should handle UPDATE_WEB3_STATUS when connected', () => {
  expect(reducer(
    initBlockState,
    {
      type: types.UPDATE_WEB3_STATUS,
      payload: {},
    },
  )).toEqual(connectedBlockState);
});

test('should handle UPDATE_WEB3_STATUS when not connected', () => {
  expect(reducer(
    initBlockState,
    {
      type: types.UPDATE_WEB3_STATUS,
      payload: null,
    },
  )).toEqual(notConnectedBlockState);
});
