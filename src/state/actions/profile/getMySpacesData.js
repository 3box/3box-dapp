import Box from '3box';
import cloneDeep from 'lodash.clonedeep';

import {
  store,
} from '../../store';

const getMySpacesData = address => async (dispatch) => {
  try {
    const allData = {};
    allData['3Box'] = {};

    // get list of spaces
    const list = await Box.listSpaces(address);

    // function to get space and pair to key
    const getSpace = async (spaceName) => {
      const space = await Box.getSpace(address, spaceName);
      allData[spaceName] = space;
    };

    // for each space
    const spaceDataPromise = async () => Promise
      .all(list.map(spaceName => getSpace(spaceName)));

    await spaceDataPromise();

    // merge myData into space data object
    const {
      myData,
    } = store.getState();

    Object.entries(myData).forEach((row) => {
      if ((row[0] !== 'box') &&
        (row[0] !== 'collectiblesFavorites')) {
        allData['3Box'][row[0]] = cloneDeep(row[1]);
      }
    });

    dispatch({
      type: 'MY_SPACES_DATA_UPDATE',
      list,
      allData,
    });
  } catch (error) {
    console.error(error);
  }
};

export default getMySpacesData;