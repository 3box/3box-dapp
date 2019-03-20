const viewSpaceItem = (showSpaceDataItemModal, showDeleteItemModal, dataKey, dataValue, spaceName, rowType, privacy) => async (dispatch) => {
  try {
    dispatch({
      type: 'UI_HANDLE_SPACES_VIEW_MODAL',
      showSpaceDataItemModal,
      showDeleteItemModal,
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