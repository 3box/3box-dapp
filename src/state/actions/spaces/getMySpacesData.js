import Box from '3box';
import cloneDeep from 'lodash.clonedeep';

import {
  store,
} from '../../store';

const getMySpacesData = address => async (dispatch) => {
  try {
    const {
      allData,
    } = store.getState().spaces;
    console.log('allData', allData);
    const updatedAllData = cloneDeep(allData);
    // console.log('originalAllData', originalAllData);
    // const updatedAllData = cloneDeep(originalAllData);
    console.log('updatedAllData', updatedAllData);
    // const updatedAllData = {};
    // updatedAllData['3Box'] = {};

    const list = await Box.listSpaces(address); // get list of spaces
    console.log('list', list);

    const getSpace = async (spaceName) => { // function to get space and pair to key
      const opts = {
        metadata: true,
      };
      const space = await Box.getSpace(address, spaceName, opts);
      updatedAllData[spaceName] = {};
      updatedAllData[spaceName].private = {
        private_space_data: true,
      };
      updatedAllData[spaceName].public = space;

      console.log('space', space);

      const threadNames = [];
      const threadCalls = [];

      Object.entries(space).forEach((kv) => {
        console.log(kv);
        if (kv[0].substring(0, 7) === 'thread-') {
          threadNames.push(kv[1].value.name);
          console.log(kv[1].value.name);
          const promise = Box.getThread(spaceName, kv[1].value.name);
          threadCalls.push(promise);
        }

        if (kv[0].substring(0, 14) === 'follow-thread-') {
          delete updatedAllData[spaceName].public[kv[0]];
        }
      });

      console.log(updatedAllData[spaceName].public);

      if (threadCalls.length > 0) {
        const threadPromise = Promise.all(threadCalls);

        const threadData = await threadPromise;

        threadData.forEach((thread, i) => {
          updatedAllData[spaceName].public[`thread-${threadNames[i]}`] = thread;
        });
      }
    };

    const spaceDataPromise = async () => Promise // for each space
      .all(list.map(spaceName => getSpace(spaceName)));

    await spaceDataPromise();

    dispatch({
      type: 'SPACES_DATA_UPDATE',
      list,
      allData: updatedAllData,
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