import contractMap from 'eth-contract-metadata';
import abiDecoder from 'abi-decoder';
import {
  toChecksumAddress,
} from 'ethereumjs-util';

import {
  store,
} from '../../../store';

export const addPublicOrPrivateDataType = (activity, dataType) => activity.map((row) => {
  row.timeStamp = row.timeStamp && row.timeStamp.toString().substring(0, 10);
  return Object.assign({
    dataType,
  }, row);
});

// get the user's latest post in a thread
export const getAuthorsLatestPost = (threadArray, usersDID) => {
  const userPostIndex = [];

  threadArray.forEach((item, i) => {
    if (item.author === usersDID) {
      userPostIndex.push(i);
    }
  });

  const lastPostIndex = userPostIndex[userPostIndex.length - 1];

  return threadArray[lastPostIndex];
};

export const getMyFeed = async (categorizedActivity) => {
  let updatedEmailProof;
  let unFilteredPublicActivity;
  let privateActivity;

  // get 3box logs
  try {
    unFilteredPublicActivity = await store.getState().myData.box.public.log();
  } catch (error) {
    console.error(error);
  }

  try {
    privateActivity = await store.getState().myData.box.private.log();
  } catch (error) {
    console.error(error);
  }

  try {
    updatedEmailProof = await store.getState().myData.box._3id.hashDBKey('proof_email');
  } catch (error) {
    console.error(error);
  }

  // remove ethereum_proof & proof_did & memberSince
  const publicActivity = unFilteredPublicActivity
    .filter((item) => (item.key !== 'ethereum_proof' &&
      item.key !== 'proof_did' &&
      item.key !== 'collectiblesFavorites' &&
      item.key !== 'memberSince'));

  // assign public or private data type
  const categorizedPublicActivity = addPublicOrPrivateDataType(publicActivity, 'Public');
  const categorizedPrivateActivity = privateActivity ? addPublicOrPrivateDataType(privateActivity, 'Private') : [];

  const spacesData = store.getState().spaces.allData || {};
  const spacesDataActivity = [];

  Object.entries(spacesData).forEach((space) => {
    const spaceName = space[0];

    if (spaceName !== '3Box_app') {
      Object.entries(space[1].private).forEach((keyValue) => {
        if (keyValue[0] !== 'private_space_data') {
          const spaceToActivityItem = {
            dataType: 'Private',
            key: keyValue[0],
            timeStamp: keyValue[1].timestamp ? keyValue[1].timestamp.toString().substring(0, 10) : '',
            value: keyValue[1].value,
            spaceName,
          };
          spacesDataActivity.push(spaceToActivityItem);
        }
      });

      Object.entries(space[1].public).forEach((keyValue) => {
        const valueObject = keyValue[1];
        let {
          value,
        } = valueObject;
        const isArray = Array.isArray(valueObject);

        if (isArray && valueObject.length === 0) return;

        const usersDID = store.getState().myData.did;
        const latestPost = (valueObject[0] && valueObject[0].message) && getAuthorsLatestPost(valueObject, usersDID);

        let timeStamp;

        if (latestPost) {
          // if object is a thread
          timeStamp = latestPost.timestamp;
        } else {
          timeStamp = valueObject.timestamp || '';
        }

        let arrayValue = '';

        if (isArray && valueObject.length > 0) {
          arrayValue = valueObject[0].message ? latestPost.message : valueObject[0];
        } else if (value === 'object' && !isArray) {
          [value] = Object.keys(value);
        }

        const spaceToActivityItem = {
          dataType: 'Public',
          key: keyValue[0],
          timeStamp,
          value: isArray ? arrayValue : value,
          spaceName,
        };

        spacesDataActivity.push(spaceToActivityItem);
      });
    }
  });

  const updatedFeed = categorizedActivity.internal
    .concat(categorizedActivity.txs)
    .concat(categorizedActivity.token)
    .concat(categorizedPublicActivity)
    .concat(categorizedPrivateActivity)
    .concat(spacesDataActivity);

  return {
    updatedFeed,
    updatedEmailProof,
  };
};

export const addTimeStamp = (feed, otherProfileAddress, emailProof) => {
  feed.map((item, i) => {
    const feedItem = item;
    if (!feedItem.timeStamp) {
      const deletedTime = parseInt(feed[i - 1].timeStamp, 10) + 1;
      feedItem.timeStamp = deletedTime.toString();
    }
    if (!otherProfileAddress && feedItem.key === emailProof) feedItem.key = 'proof_email';
    return feedItem;
  });

  return feed;
};

export const groupByAddress = (feed, otherProfileAddress) => {
  const feedByAddress = [];
  feed.forEach((item) => {
    let othersAddress;

    // check if to or from is counterparty's address
    if (otherProfileAddress) {
      othersAddress = item.from.toLowerCase() ===
        store.getState().otherProfile.otherProfileAddress.toLowerCase() ?
        item.to :
        item.from;
    } else {
      othersAddress = (item.from && item.from.toLowerCase()) ===
        store.getState().userState.currentAddress.toLowerCase() ?
        item.to :
        item.from;
    }

    // group feed by 3box or counterparty address activity
    if (feedByAddress.length > 0 &&
      Object.keys(feedByAddress[feedByAddress.length - 1])[0] === othersAddress) {
      feedByAddress[feedByAddress.length - 1][othersAddress].push(item);
    } else if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === 'threeBox' && !item.spaceName && (item.dataType === 'Public' || item.dataType === 'Private')) {
      feedByAddress[feedByAddress.length - 1].threeBox.push(item);
    } else if (feedByAddress.length > 0 && Object.keys(feedByAddress[feedByAddress.length - 1])[0] === item.spaceName) {
      feedByAddress[feedByAddress.length - 1][item.spaceName].push(item);
    } else if (item.spaceName) {
      feedByAddress.push({
        [item.spaceName]: [item],
      });
    } else if ((item.dataType === 'Public' || item.dataType === 'Private') && !item.spaceName) {
      feedByAddress.push({
        threeBox: [item],
      });
    } else {
      feedByAddress.push({
        [othersAddress]: [item],
      });
    }
  });

  return feedByAddress;
};

export const addDataType = (activity) => {
  activity.internal = activity.internal.map((object) => Object.assign({
    dataType: 'Internal',
  }, object));
  activity.txs = activity.txs.map((object) => Object.assign({
    dataType: 'Txs',
  }, object));
  activity.token = activity.token.map((object) => Object.assign({
    dataType: 'Token',
  }, object));

  return activity;
};

export const imageElFor = (address) => {
  const contractMetaData = contractMap[toChecksumAddress(address)];
  if (!contractMetaData || (!('logo' in contractMetaData))) {
    return false;
  }
  // this isnt necessary
  const fileName = contractMetaData.logo;
  const path = `/contractIcons/${fileName}`;
  const contractImg = document.createElement('img');
  contractImg.src = path;
  contractImg.style.width = '100%';
  return [contractImg, contractMetaData];
};

export async function getContract(otherAddress) {
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${otherAddress}&apikey=3VTI9D585DCX4RD4QSP3MYWKACCIVZID23`);
    if (response.status !== 200) {
      return console.error(`Looks like there was a problem. Status Code: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
}

const startProfileLoad = (otherProfileAddress, feedByAddress) => {
  if (otherProfileAddress) {
    store.dispatch({
      type: 'OTHER_ACTIVITY_UPDATE',
      otherProfileActivity: feedByAddress,
    });
    // store.dispatch({
    //   type: 'OTHER_WALL_UPDATE',
    //   otherWallPosts: feedByAddress,
    // });
    store.dispatch({
      type: 'UI_FEED_OTHER_LOADING',
      isFetchingOtherActivity: false,
    });
  } else {
    store.dispatch({
      type: 'USER_LOGIN_UPDATE',
      isLoggedIn: true,
    });
    store.dispatch({
      type: 'UI_FEED_LOADING',
      isFetchingActivity: false,
    });
    store.dispatch({
      type: 'MY_FEED_UPDATE',
      feedByAddress,
    });
  }
};

export const updateFeed = (otherProfileAddress, feedByAddress, addressData, isContract) => {
  try {
    let counter = 0;
    if (feedByAddress.length === 0) startProfileLoad(otherProfileAddress, feedByAddress);

    feedByAddress.map(async (txGroup, i) => {
      const otherAddress = Object.keys(txGroup)[0];

      if (isContract[otherAddress]) { // then address is contract
        const contractDataABI = addressData[otherAddress].contractData;

        if (contractDataABI) {
          abiDecoder.addABI(contractDataABI);

          txGroup[otherAddress].map((lineItem, index) => {
            const methodCall = abiDecoder.decodeMethod(txGroup[otherAddress][index].input);
            lineItem.methodCall = methodCall && methodCall.name && (methodCall.name.charAt(0).toUpperCase() + methodCall.name.slice(1)).replace(/([A-Z])/g, ' $1').trim();
          });
        }

        feedByAddress[i].metaData = {
          ...addressData[otherAddress],
        };

        counter += 1;
        if (counter === feedByAddress.length) startProfileLoad(otherProfileAddress, feedByAddress);
      } else { // look for 3box metadata
        feedByAddress[i].metaData = {
          name: addressData && addressData[otherAddress] && addressData[otherAddress].name,
          image: addressData && addressData[otherAddress] && addressData[otherAddress].image,
          ensName: addressData && addressData[otherAddress] && addressData[otherAddress].ensName,
        };
        counter += 1;
        if (counter === feedByAddress.length) startProfileLoad(otherProfileAddress, feedByAddress);
      }
    });
  } catch (error) {
    console.log(error);
  }
};