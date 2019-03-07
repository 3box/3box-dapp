import {
  store,
} from '../../store';

const getProfileValue = (type, key) => async (dispatch) => {
  try {
    const keyUppercase = key.toUpperCase();
    const keyToAdd = await store.getState().threeBox.box[type].get(key);
    const typeUppercase = type.toUpperCase();

    dispatch({
      type: `GET_${typeUppercase}_${keyUppercase}`,
      [key]: keyToAdd,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getProfileValue;