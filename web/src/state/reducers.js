import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { web3Reducer } from './web3/reducers';
// import user from './reducer-user';

export default combineReducers({
  web3: web3Reducer,
  // user,
  form: formReducer,
  routing: routeReducer,
});
