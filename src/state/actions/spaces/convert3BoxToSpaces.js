import cloneDeep from 'lodash.clonedeep';

import {
  store,
} from '../../store';

const filterDappKeys = (row) => {
  if ((row !== 'box') &&
    (row !== 'feedByAddress') &&
    (row !== 'collection') &&
    (row !== 'did') &&
    (row !== 'memberSince') &&
    (row !== 'following') &&
    (row !== 'followingList') &&
    (row !== 'followingThread') &&
    (row !== 'followingSpace')) {
    return true;
  }
  return false;
};

const convert3BoxToSpaces = () => async (dispatch) => {
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

    Object.entries(myData).forEach((row) => {
      if (filterDappKeys(row[0])) {
        if (row[0] === 'verifiedEmail' || row[0] === 'birthday') {
          rowData.push([row[0], cloneDeep(row[1])]);
          const metaData = store.getState().myData.box.private.getMetadata(row[0]);
          rowCalls.push(metaData);
        } else {
          rowData.push([row[0], cloneDeep(row[1])]);

          const key = row[0] === 'collectiblesFavoritesToRender' ?
            'collectiblesFavorites' :
            row[0];

          const metaData = store.getState().myData.box.public.getMetadata(key);
          rowCalls.push(metaData);
        }
      }
    });

    const rowPromises = Promise.all(rowCalls);
    const rowMetaData = await rowPromises;

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

    dispatch({
      type: 'SPACES_DATA_UPDATE',
      allData,
    });
  } catch (error) {
    console.error(error);
  }
};

export default convert3BoxToSpaces;