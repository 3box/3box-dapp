import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import { web3Reducer } from './web3/reducers';
import user from './reducer-user';

export default combineReducers({
  web3: web3Reducer,
  user,
  routing: routeReducer,
});
