import {
  GET_THREEBOX,
  GET_PUBLIC_NAME,
  GET_PUBLIC_GITHUB,
  GET_PUBLIC_IMAGE,
  GET_PRIVATE_EMAIL,

  GET_PUBLIC,
  SET_PUBLIC,
  REMOVE_PUBLIC,
  GET_PRIVATE,
  SET_PRIVATE,
  REMOVE_PRIVATE,
} from './actions';

const initialState = {};

export default function threeBoxReducer(state = initialState, action) {
  switch (action.type) {
    case GET_THREEBOX:
      return {
        ...state,
        threeBoxObject: action.threeBox,
      };

    case GET_PUBLIC_NAME:
      return {
        ...state,
        name: action.name,
      };

    case GET_PUBLIC_GITHUB:
      return {
        ...state,
        github: action.github,
      };

    case GET_PUBLIC_IMAGE:
      return {
        ...state,
        image: action.image,
      };

    case GET_PRIVATE_EMAIL:
      return {
        ...state,
        email: action.email,
      };

    case SET_PUBLIC:
      return {
        threeBox: action.threeBox,
      };

    case REMOVE_PUBLIC:
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