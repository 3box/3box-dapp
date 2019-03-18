import Box from '3box';
import cloneDeep from 'lodash.clonedeep';

import {
  store,
} from '../../store';

const getMySpacesData = address => async (dispatch) => {
  try {
    const allData = {};
    allData['3Box'] = {};

    const list = await Box.listSpaces(address); // get list of spaces
    const getSpace = async (spaceName) => { // function to get space and pair to key
      const space = await Box.getSpace(address, spaceName);
      allData[spaceName] = {};
      allData[spaceName].private = {
        private_space_data: true,
      };
      allData[spaceName].public = space;
    };

    const spaceDataPromise = async () => Promise // for each space
      .all(list.map(spaceName => getSpace(spaceName)));

    await spaceDataPromise();

    const { // merge myData into space data object
      myData,
    } = store.getState();
    allData['3Box'].private = {};
    allData['3Box'].public = {};

    Object.entries(myData).forEach((row) => {
      if ((row[0] !== 'box') &&
        (row[0] !== 'collectiblesFavorites')) {
        if (row[0] === 'verifiedEmail' || row[0] === 'birthday') {
          allData['3Box'].private[row[0]] = cloneDeep(row[1]);
        } else {
          allData['3Box'].public[row[0]] = cloneDeep(row[1]);
        }
      }
    });

    dispatch({
      type: 'SPACES_DATA_UPDATE',
      list,
      allData,
    });
    dispatch({
      type: 'UI_SPACES_LOADING',
      isSpacesLoading: false,
    });
  } catch (error) {
    dispatch({
      type: 'UI_SPACES_LOADING',
      isSpacesLoading: false,
    });
    console.error(error);
  }
};

export default getMySpacesData;