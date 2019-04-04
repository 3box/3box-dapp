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

    console.log('spacesList', list);

    const getSpace = async (spaceName) => { // function to get space and pair to key
      const space = await Box.getSpace(address, spaceName);
      allData[spaceName] = {};
      allData[spaceName].private = {
        private_space_data: true,
      };
      allData[spaceName].public = space;

      console.log('gotSpace', space);

      // if (Object.keys(space)[0] && Object.keys(space)[0].substring(0, 14) === 'follow-thread-') {
      //   const thread = await Box.getThread(spaceName, Object.values(space)[0].name);
      //   console.log('thread', thread);
      //   allData[spaceName].public.thread = thread;
      // }
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
        (row[0] !== 'feedByAddress') &&
        (row[0] !== 'collection') &&
        (row[0] !== 'memberSince') &&
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