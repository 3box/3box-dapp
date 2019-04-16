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
        if (kv[0].substring(0, 7) === 'thread-') {
          threadNames.push(kv[1].value.name);
          const promise = Box.getThread(spaceName, kv[1].value.name);
          threadCalls.push(promise);
        }
      });

      if (threadCalls.length === 0) return;

      const threadPromise = Promise.all(threadCalls);

      const threadData = await threadPromise;

      threadData.forEach((thread, i) => {
        updatedAllData[spaceName].public[`thread-${threadNames[i]}`] = thread;
      });
    };

    const spaceDataPromise = async () => Promise // for each space
      .all(list.map(spaceName => getSpace(spaceName)));

    await spaceDataPromise();

    // const { // merge myData into space data object
    //   myData,
    // } = store.getState();
    // updatedAllData['3Box'].private = {};
    // updatedAllData['3Box'].public = {};

    // const rowData = [];
    // const rowCalls = [];

    // Object.entries(myData).forEach((row) => {
    //   if ((row[0] !== 'box') &&
    //     (row[0] !== 'feedByAddress') &&
    //     (row[0] !== 'collection') &&
    //     (row[0] !== 'did') &&
    //     (row[0] !== 'memberSince') &&
    //     (row[0] !== 'collectiblesFavorites')) {
    //     if (row[0] === 'verifiedEmail' || row[0] === 'birthday') {
    //       rowData.push([row[0], cloneDeep(row[1])]);
    //       const metaData = store.getState().myData.box.private.getMetadata(row[0]);
    //       rowCalls.push(metaData);
    //     } else {
    //       rowData.push([row[0], cloneDeep(row[1])]);

    //       const key = row[0] === 'collectiblesFavoritesToRender' ?
    //         'collectiblesFavorites' :
    //         row[0];

    //       const metaData = store.getState().myData.box.public.getMetadata(key);
    //       rowCalls.push(metaData);
    //     }
    //   }
    // });

    // const rowPromises = Promise.all(rowCalls);
    // const rowMetaData = await rowPromises;

    // rowMetaData.forEach((metaData, i) => {
    //   updatedAllData['3Box'].public[rowData[i][0]] = {
    //     timestamp: metaData ? metaData.timestamp : '',
    //     value: rowData[i][1],
    //   };
    // });

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