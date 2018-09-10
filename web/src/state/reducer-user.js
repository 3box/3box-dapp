import {
  GET_THREEBOX,
  SAVE_THREEBOX,
} from './actions';

const initialState = {};

export default function threeBoxReducer(state = initialState, action) {
  switch (action.type) {
    case GET_THREEBOX:
      return {
        threeBox: action.threeBox,
      };

    case SAVE_THREEBOX:
      return {
        threeBox: action.threeBox,
      };

    default:
      return state;
  }
}
