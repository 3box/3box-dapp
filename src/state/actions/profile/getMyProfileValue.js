import {
  store,
} from '../../store';

const getMyProfileValue = async (type, key, update) => {
  try {
    const keyUppercase = key.toUpperCase();
    const value = await store.getState().myData.box[type].get(key);
    const metadata = await store.getState().myData.box[type].getMetadata(key);

    const valueObject = {
      value,
      timestamp: metadata ? metadata.timestamp : null,
    };

    if (!value && !update) return null;

    store.dispatch({
      type: `MY_${keyUppercase}_UPDATE`,
      [key]: value,
    });

    return valueObject;
  } catch (error) {
    return console.error(error);
  }
};

export default getMyProfileValue;

// const fieldsToFetch = [{
//   type: 'public',
//   key: 'name',
// }, {
//   type: 'public',
//   key: 'description',
// }, {
//   type: 'public',
//   key: 'image',
// }, {
//   type: 'public',
//   key: 'coverPhoto',
// }, {
//   type: 'public',
//   key: 'location',
// }, {
//   type: 'public',
//   key: 'website',
// }, {
//   type: 'public',
//   key: 'employer',
// }, {
//   type: 'public',
//   key: 'job',
// }, {
//   type: 'public',
//   key: 'school',
// }, {
//   type: 'public',
//   key: 'degree',
// }, {
//   type: 'public',
//   key: 'major',
// }, {
//   type: 'public',
//   key: 'year',
// }, {
//   type: 'public',
//   key: 'emoji',
// }, {
//   type: 'private',
//   key: 'birthday',
// }];