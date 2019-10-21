import Box from '3box';
import contractMap from 'eth-contract-metadata';
import abiDecoder from 'abi-decoder';
import {
  detect,
} from 'detect-browser';
import {
  toChecksumAddress,
} from 'ethereumjs-util';

import * as routes from './routes';
import {
  store,
} from '../state/store';

export const normalizeURL = (pathname) => {
  const lowercasePathname = pathname.toLowerCase();
  const fuzzyLowercasePathname = lowercasePathname.charAt(lowercasePathname.length - 1) === '/' ?
    lowercasePathname.slice(0, -1) :
    lowercasePathname;

  return fuzzyLowercasePathname;
};

export const matchProtectedRoutes = (secondRoute) => {
  if (
    secondRoute === routes.ACTIVITY ||
    secondRoute === routes.DETAILS ||
    secondRoute === routes.COLLECTIBLES ||
    secondRoute === routes.DATA ||
    secondRoute === routes.FOLLOWING ||
    secondRoute === routes.EDIT
  ) {
    return true;
  }
  return false;
};

export const addhttp = (url) => {
  let correctedURL;
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    correctedURL = `http://${url}`;
  } else {
    correctedURL = url;
  }
  return correctedURL;
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
    console.error(err);
  }
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

const fireDispatch = (otherProfileAddress, feedByAddress) => {
  if (otherProfileAddress) {
    store.dispatch({
      type: 'OTHER_ACTIVITY_UPDATE',
      otherProfileActivity: feedByAddress,
    });
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
  let contractArray = [];
  let counter = 0;
  if (feedByAddress.length === 0) fireDispatch(otherProfileAddress, feedByAddress);
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

      contractArray = imageElFor(otherAddress);

      feedByAddress[i].metaData = {
        contractImg: contractArray.length > 0 && contractArray[0],
        contractDetails: contractArray.length > 0 && contractArray[1],
      };

      counter += 1;
      if (counter === feedByAddress.length) fireDispatch(otherProfileAddress, feedByAddress);
    } else { // look for 3box metadata
      feedByAddress[i].metaData = {
        name: addressData && addressData[otherAddress] && addressData[otherAddress].name,
        image: addressData && addressData[otherAddress] && addressData[otherAddress].image,
      };
      counter += 1;
      if (counter === feedByAddress.length) fireDispatch(otherProfileAddress, feedByAddress);
    }
  });
};

export const addDataType = (activity) => {
  activity.internal = activity.internal.map(object => Object.assign({
    dataType: 'Internal',
  }, object));
  activity.txs = activity.txs.map(object => Object.assign({
    dataType: 'Txs',
  }, object));
  activity.token = activity.token.map(object => Object.assign({
    dataType: 'Token',
  }, object));

  return activity;
};

export const addPublicOrPrivateDataType = (activity, dataType) => activity.map((row) => {
  row.timeStamp = row.timeStamp && row.timeStamp.toString().substring(0, 10);
  return Object.assign({
    dataType,
  }, row);
});

export const copyToClipBoard = (type, message) => async (dispatch) => {
  try {
    const textArea = document.createElement('textarea');

    if (type === 'did') {
      textArea.value = message;
    } else if (type === 'profile') {
      textArea.value = `https://www.3box.io/${store.getState().userState.currentAddress}`;
    }

    document.body.appendChild(textArea);
    textArea.focus({
      preventScroll: true,
    });
    textArea.select();
    document.execCommand('copy');

    setTimeout(() => {
      dispatch({
        type: 'UI_COPY_SUCCESSFUL',
        copySuccessful: true,
      });
    }, 1);
    setTimeout(() => {
      dispatch({
        type: 'UI_COPY_SUCCESSFUL',
        copySuccessful: false,
      });
    }, 2000);

    document.body.removeChild(textArea);
  } catch (err) {
    console.error('Unable to copy', err);
  }
};

export const checkRowType = async (content) => {
  try {
    if (typeof content[1] === 'string') {
      if (content[0].substring(0, 8) === 'verified') return 'Claim';
      const isClaim = await Box.idUtils.isClaim(content[1]);
      if (isClaim) {
        const isVerified = await Box.idUtils.verifyClaim(content[1]);
        return 'Claim';
      }
      return 'Text';
    }
    if (Array.isArray(content[1]) && content[0].substring(0, 7) === 'thread-') return 'Thread';
    if (typeof content[1] === 'object' && !Array.isArray(content[1])) return 'Object';
    if (Array.isArray(content[1]) &&
      content[1][0] &&
      content[1][0]['@type'] === 'ImageObject') return 'Image';
    if (Array.isArray(content[1]) &&
      (!content[1][0] || (content[1][0] &&
        content[1][0]['@type'] !==
        'ImageObject'))) return 'List';
  } catch (err) {
    console.error(err);
  }
};

export const sortSpace = (updatedSortedSpace, category) => {
  updatedSortedSpace.sort((a, b) => {
    const aName = a.name === 'collectiblesFavoritesToRender' ?
      'favoriteCollectibles' : a.name;
    const bName = b.name === 'collectiblesFavoritesToRender' ?
      'favoriteCollectibles' : b.name;

    const currentA = category !== 'name' ? a[category] : aName;
    const currentB = category !== 'name' ? b[category] : bName;

    let updatedA;
    let updatedB;

    if (a.type === 'Thread') {
      if (a.content.length > 0) {
        updatedA = a.content[a.content.length - 1].timeStamp;
      } else {
        updatedA = '';
      }
    } else {
      updatedA = a.lastUpdated;
    }

    if (b.type === 'Thread') {
      if (b.content.length > 0) {
        updatedB = b.content[b.content.length - 1].timeStamp;
      } else {
        updatedB = '';
      }
    } else {
      updatedB = b.lastUpdated;
    }

    if (category === 'lastUpdated') {
      if (typeof updatedA === 'undefined' && typeof updatedB === 'undefined') return 1;
      if (typeof updatedA === 'undefined' && typeof updatedB !== 'undefined') return 1;
      if (typeof updatedA !== 'undefined' && typeof updatedB === 'undefined') return -1;

      if (typeof updatedA === 'number' && typeof updatedB === 'string') return -1;
      if (typeof updatedA === 'string' && typeof updatedB === 'number') return 1;
      if (typeof updatedA === 'string' && typeof updatedB === 'string') return -1;

      if (updatedA < updatedB) return 1;
      if (updatedA > updatedB) return -1;
    } else {
      if (typeof currentA !== 'string' && typeof currentB !== 'string') return 1;
      if (typeof currentA !== 'string' && currentB.toLowerCase()) return 1;
      if (currentA.toLowerCase() && typeof currentB !== 'string') return -1;
      if (currentA.toLowerCase() < currentB.toLowerCase()) return -1;
      if (currentA.toLowerCase() > currentB.toLowerCase()) return 1;

      if (typeof updatedA === 'undefined' && typeof updatedB === 'undefined') return -1;
      if (typeof updatedA === 'undefined' && typeof updatedB !== 'undefined') return -1;
      if (typeof updatedA !== 'undefined' && typeof updatedB === 'undefined') return 1;
      if (typeof updatedA === 'number' && typeof updatedB === 'string') return -1;
      if (typeof updatedA === 'string' && typeof updatedB === 'number') return 1;
      if (typeof updatedA === 'string' && typeof updatedB === 'string') return -1;
      if (updatedA < updatedB) return 1;
      if (updatedA > updatedB) return -1;
    }

    if (typeof aName !== 'string' && typeof bName !== 'string') return 1;
    if (typeof aName !== 'string' && bName.toLowerCase()) return 1;
    if (aName.toLowerCase() && typeof bName !== 'string') return -1;
    if (aName.toLowerCase() < bName.toLowerCase()) return -1;
    if (aName.toLowerCase() > bName.toLowerCase()) return 1;

    if (typeof a.space !== 'string' && typeof b.space !== 'string') return 1;
    if (typeof a.space !== 'string' && b.space.toLowerCase()) return 1;
    if (a.space.toLowerCase() && typeof b.space !== 'string') return -1;
    if (a.space.toLowerCase() < b.space.toLowerCase()) return -1;
    if (a.space.toLowerCase() > b.space.toLowerCase()) return 1;

    if (typeof a.type !== 'string' && typeof b.type !== 'string') return 1;
    if (typeof a.type !== 'string' && b.type.toLowerCase()) return 1;
    if (a.type.toLowerCase() && typeof b.type !== 'string') return -1;
    if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
    if (a.type.toLowerCase() > b.type.toLowerCase()) return 1;

    if (typeof a.content !== 'string' && typeof b.content !== 'string') return 1;
    if (typeof a.content !== 'string' && b.content.toLowerCase()) return 1;
    if (a.content.toLowerCase() && typeof b.content !== 'string') return -1;
    if (a.content.toLowerCase() < b.content.toLowerCase()) return -1;
    if (a.content.toLowerCase() > b.content.toLowerCase()) return 1;

    return 0;
  });
};

export const extractRow = async (spaceData, spaceNameGiven, updatedSortedSpace) => {
  try {
    if (!spaceData) return;

    const rowItems = [];
    const rowCalls = [];

    Object.entries(spaceData).forEach((privacy) => {
      Object.entries(privacy[1]).forEach((row) => {
        const content = Array.isArray(row[1]) ? row[1] : row[1].value;
        rowItems.push([spaceNameGiven, row[0], row[1], privacy[0]]);
        const promise = checkRowType([row[0], content]);
        rowCalls.push(promise);
      });
    });

    const rowPromises = Promise.all(rowCalls);
    const rowType = await rowPromises;

    rowType.forEach((type, i) => {
      updatedSortedSpace.push({
        space: rowItems[i][0],
        name: rowItems[i][1],
        content: rowItems[i][2].value || rowItems[i][2],
        type,
        privacy: rowItems[i][3],
        lastUpdated: rowItems[i][2].timestamp,
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export const checkIsEthAddress = (string) => {
  const isEthereumAddress = /^(0x)?[0-9a-f]{40}$/i.test(string);
  return isEthereumAddress;
};

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

export const getFollowingProfiles = async (following) => {
  const fetchProfile = async (ethAddr) => await Box.getProfile(ethAddr);
  const fetchAllProfiles = async () => await Promise.all(following.map(user => fetchProfile(user.message.identifier[1].value)));
  const profiles = await fetchAllProfiles();

  const profilesAndAddress = [];
  profiles.forEach((profile, i) => {
    profilesAndAddress.push([profile, following[i].message.identifier[1].value]);
  });
  return profilesAndAddress;
};

export const checkFollowing = (following, otherProfileAddress) => {
  if (!following) return false;
  return following.some(user => user.message.identifier[1].value === otherProfileAddress);
};

export const alphabetize = (array) => {
  const sortedArray = array.sort((a, b) => {
    if (!a[0].name) return -1;
    if (!b[0].name) return 1;
    if (a[0].name.toLowerCase() < b[0].name.toLowerCase()) return -1;
    if (a[0].name.toLowerCase() > b[0].name.toLowerCase()) return 1;
    return 0;
  });
  return sortedArray;
};

export const shortenEthAddr = (str) => {
  const shortenStr = str && `${str.substring(0, 5)}...${str.substring(str.length - 5, str.length)}`;
  return shortenStr;
};

export const checkRequestRoute = (splitRoute) => {
  const route2 = splitRoute[2] && splitRoute[2].toLowerCase();
  const route3 = splitRoute[3] && splitRoute[3].toLowerCase();
  const isRequest =
    route2 === 'twitterrequest' ||
    route2 === 'previewrequest' ||
    route3 === 'twitterrequest' ||
    route3 === 'previewrequest';
  return isRequest;
};

export const checkUsingInjectedProvider = (provider) => {
  const {
    isFortmatic,
    isPortis,
    isWalletConnect,
  } = provider;

  if (isFortmatic || isPortis || isWalletConnect) return false;
  return true;
  // isCipher,
  // isMetaMask,
  // isDapper,
};

export const checkIsMobile = () => {
  let isMobile;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
  } else {
    isMobile = false;
  }
  return isMobile;
};

export const checkIsMobileWithoutWeb3 = () => {
  let isMobileWithWeb3 = false;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasWeb3 = typeof window.web3 !== 'undefined' || typeof window.ethereum !== 'undefined';
  if (isMobile && !hasWeb3) isMobileWithWeb3 = true;
  return isMobileWithWeb3;
};

export const capitalizeFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isBrowserCompatible = () => {
  const browser = detect();
  const {
    version,
    name
  } = browser;

  if (name !== 'safari') return true;

  const majorVersion = parseInt(version.split('.')[0]);
  const minorVersion = parseInt(version.split('.')[1]);
  if (majorVersion > 11 || (majorVersion === 11 && minorVersion >= 1)) return true;
  if (majorVersion < 11 || (majorVersion === 11 && minorVersion < 1)) {
    store.dispatch({
      type: 'UI_UNSUPPORTED_BROWSER_MODAL',
      showUnsupportedBrowser: true,
    });
    return false;
  }
};