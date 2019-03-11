import {
  combineReducers,
} from 'redux';

import myDataReducer from './myData';
import otherProfileReducer from './otherProfile';
import uiStateReducer from './uiState';
import userStateReducer from './userState';

export default combineReducers({
  myData: myDataReducer,
  otherProfile: otherProfileReducer,
  uiState: uiStateReducer,
  userState: userStateReducer,
});