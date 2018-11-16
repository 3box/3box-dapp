import {
  combineReducers,
} from 'redux';

import {
  threeBoxReducer,
} from './reducer-threeBox';

export default combineReducers({
  threeBox: threeBoxReducer,
});
