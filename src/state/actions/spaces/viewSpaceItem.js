const viewSpaceItem = (
  showSpaceDataItemModal,
  showDeleteItemModal,
  showOpenSpaceModal,
  dataKey,
  dataValue,
  spaceName,
  rowType,
  privacy,
  listIndex,
) => async (dispatch) => {
  try {
    dispatch({
      type: 'UI_HANDLE_SPACES_VIEW_MODAL',
      showSpaceDataItemModal,
      showDeleteItemModal,
      showOpenSpaceModal,
      spaceItem: {
        dataKey,
        dataValue,
        spaceName,
        rowType,
        privacy,
        listIndex,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default viewSpaceItem;