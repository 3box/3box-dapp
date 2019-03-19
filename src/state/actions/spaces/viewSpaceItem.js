import {
  store,
} from '../../store';

const viewSpaceItem = (dataKey, dataValue, spaceName, rowType, privacy) => async (dispatch) => {
  try {
    console.log(dataKey,
      dataValue,
      spaceName,
      rowType,
      privacy);
    dispatch({
      type: 'UI_HANDLE_SPACES_VIEW_MODAL',
      showSpaceDataItemModal: !store.getState().uiState.showSpaceDataItemModal,
      spaceItem: {
        dataKey,
        dataValue,
        spaceName,
        rowType,
        privacy,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default viewSpaceItem;