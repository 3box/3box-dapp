import {
  store,
} from '../../store';

const getMyProfileValue = (type, key, update) => async (dispatch) => {
  try {
    const keyUppercase = key.toUpperCase();
    const value = await store.getState().myData.box[type].get(key);
    const metadata = await store.getState().myData.box[type].getMetadata(key);

    const valueObject = {
      value,
      timestamp: metadata ? metadata.timestamp : null,
    };

    if (!value && !update) return null;

    dispatch({
      type: `MY_${keyUppercase}_UPDATE`,
      [key]: value,
    });

    if (!value) return null;


    return valueObject;
  } catch (error) {
    console.error(error);
  }
};

export default getMyProfileValue;