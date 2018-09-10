import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import { web3Reducer } from './web3/reducers';
import threeBox from './reducer-user';

export default combineReducers({
  web3: web3Reducer,
  threeBox,
  routing: routeReducer,
});
