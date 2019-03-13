const spacesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MY_SPACES_DATA_UPDATE':
      return {
        ...state,
        list: action.list,
        allData: action.allData,
      };

    default:
      return state;
  }
};

export default spacesReducer;