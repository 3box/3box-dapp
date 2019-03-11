import {
  store,
} from '../../store';

const getMyProfileValue = (type, key) => async (dispatch) => {
  try {
    const keyUppercase = key.toUpperCase();
    const keyToAdd = await store.getState().myData.box[type].get(key);
    const typeUppercase = type.toUpperCase();

    dispatch({
      type: `GET_MY_${typeUppercase}_${keyUppercase}`,
      [key]: keyToAdd,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getMyProfileValue;