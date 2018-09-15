import {
  GET_THREEBOX,
  GET_PUBLIC_NAME,
  GET_PUBLIC_GITHUB,
  GET_PUBLIC_IMAGE,
  GET_PRIVATE_EMAIL,
  GET_ACTIVITY,

  REQUEST_DATA,
  RECEIVE_DATA
} from './actions';

export const threeBoxReducer = (state = {}, action) => {
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

    case GET_ACTIVITY:
      return {
        ...state,
        feed: action.feed,
      };

    default:
      return state;
  }
}

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return true;
    case RECEIVE_DATA:
      return false;
    default:
      return state;
  }
};

// export const getIsFetching = state => fromList.getIsFetching(state.listByFilter[filter])