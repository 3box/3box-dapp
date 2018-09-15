import {
  combineReducers,
} from 'redux';
// import { routeReducer } from 'react-router-redux';

import {
  threeBoxReducer,
} from './reducer-user';
// import { web3Reducer } from './web3/reducers';

export default combineReducers({
  threeBoxData: threeBoxReducer,
});
