import {
  store,
} from '../../store';

const getMyProfileValue = (type, key) => async (dispatch) => {
  try {
    const keyUppercase = key.toUpperCase();
    const keyToAdd = await store.getState().myData.box[type].get(key);

    if (!keyToAdd) return;

    dispatch({
      type: `MY_${keyUppercase}_UPDATE`,
      [key]: keyToAdd,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getMyProfileValue;