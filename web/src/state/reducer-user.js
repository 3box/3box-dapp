import {
  GET_THREEBOX,
  GET_PROFILE,
  SET_PROFILE,
  REMOVE_PROFILE,
  GET_PRIVATE,
  SET_PRIVATE,
  REMOVE_PRIVATE,
} from './actions';

const initialState = {};

export default function threeBoxReducer(state = initialState, action) {
  switch (action.type) {
    case GET_THREEBOX:
      console.log(action);
      return {
        ...state,
        threeBoxObject: action.threeBox,
        name: action.name,
        github: action.github,
        image: action.image,
      };

    case GET_PROFILE:
      return {
        threeBox: action.threeBox,
      };

    case SET_PROFILE:
      return {
        threeBox: action.threeBox,
      };

    case REMOVE_PROFILE:
      return {
        threeBox: action.threeBox,
      };

    case GET_PRIVATE:
      return {
        threeBox: action.threeBox,
      };

    case SET_PRIVATE:
      return {
        threeBox: action.threeBox,
      };

    case REMOVE_PRIVATE:
      return {
        threeBox: action.threeBox,
      };

    default:
      return state;
  }
}