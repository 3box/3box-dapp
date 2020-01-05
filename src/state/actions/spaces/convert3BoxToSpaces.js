import cloneDeep from 'lodash.clonedeep';

import {
  store,
} from '../../store';

// remove keys saved to myData redux store that gets converted to spaces data
const filterDappKeys = (row) => {
  if ((row !== 'box') &&
    (row !== 'feedByAddress') &&
    (row !== 'collection') &&
    (row !== 'did') &&
    (row !== 'memberSince') &&
    (row !== 'following') &&
    (row !== 'followingList') &&
    (row !== 'profileWall') &&
    (row !== 'ens') &&
    (row !== 'fetchedProfiles') &&
    (row !== 'followingThread') &&
    (row !== 'MyFollowing') &&
    (row !== 'followingSpace')) {
    return true;
  }

  return false;
};

const convert3BoxToSpaces = async () => {
  try {
    const allData = {};
    allData['3Box_app'] = {};

    const { // merge myData into space data object
      myData,
    } = store.getState();
    allData['3Box_app'].private = {};
    allData['3Box_app'].public = {};

    const rowData = [];
    const rowCalls = [];

    // create row data
    Object.entries(myData).forEach((row) => {
      const key = row[0];
      const value = row[1];

      if (!value) return;
      if (!filterDappKeys(key)) return;

      if (key === 'verifiedEmail' || key === 'birthday') {
        // is private data
        rowData.push([key, cloneDeep(value)]);
        const metaData = store.getState().myData.box.private.getMetadata(key);
        rowCalls.push(metaData);
      } else {
        // is public data
        rowData.push([key, cloneDeep(value)]);

        const keyToFetch = key === 'collectiblesFavoritesToRender' ?
          'collectiblesFavorites' :
          key;

        const metaData = store.getState().myData.box.public.getMetadata(keyToFetch);
        rowCalls.push(metaData);
      }
    });

    const rowMetaData = await Promise.all(rowCalls);

    rowMetaData.forEach((metaData, i) => {
      if (rowData[i][0] === 'verifiedEmail' || rowData[i][0] === 'birthday') {
        allData['3Box_app'].private[rowData[i][0]] = {
          timestamp: metaData ? metaData.timestamp : '',
          value: rowData[i][1],
        };
      } else {
        allData['3Box_app'].public[rowData[i][0]] = {
          timestamp: metaData ? metaData.timestamp : '',
          value: rowData[i][1],
        };
      }
    });

    store.dispatch({
      type: 'SPACES_DATA_UPDATE',
      allData,
    });
  } catch (error) {
    console.error(error);
  }
};

export default convert3BoxToSpaces;