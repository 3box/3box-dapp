import { combineReducers } from 'redux';
// import { routeReducer } from 'react-router-redux';

import threeBox from './reducer-user';
// import { web3Reducer } from './web3/reducers';

export default combineReducers({
  threeBoxData: threeBox,
  // web3: web3Reducer,
  // routing: routeReducer,
});
