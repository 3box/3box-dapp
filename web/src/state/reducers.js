import { combineReducers } from 'redux';
import { web3Reducer } from './web3/reducers';

export default combineReducers({
  web3: web3Reducer,
});
