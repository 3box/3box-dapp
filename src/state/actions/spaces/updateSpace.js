import {
  store,
} from '../../store';

const updateSpace = updatedFields => async (dispatch) => {
  try {
    const allData = {};
    allData['3Box'] = {};
    allData['3Box'].private = {};
    allData['3Box'].public = {};

    const updatedAllData = store.getState().spaces.allData;

    updatedFields.forEach((field) => {
      updatedAllData['3Box'][field[0]] = field[1];
    });

    dispatch({
      type: 'SPACES_DATA_UPDATE',
      list: store.getState().spaces.list,
      allData: updatedAllData,
    });
  } catch (error) {
    console.error(error);
  }
};

export default updateSpace;