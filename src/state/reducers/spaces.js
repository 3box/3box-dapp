const spacesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SPACES_DATA_UPDATE':
      return {
        ...state,
        list: action.list,
        allData: action.allData,
      };

    case 'SPACES_DATA_TO_RENDER_UPDATE':
      return {
        ...state,
        sortedSpace: action.sortedSpace,
        spaceDataToRender: action.spaceDataToRender,
      };

    case 'SPACES_HAS_UPDATED':
      return {
        ...state,
        hasUpdated: action.hasUpdated,
      };

    case 'SPACES_SIGN_OUT':
      return {
        ...state,
        hasUpdated: false,
        list: [],
        allData: {},
        sortedSpace: [],
        spaceDataToRender: [],
      };

    default:
      return state;
  }
};

export default spacesReducer;