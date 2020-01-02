import Box from '3box';
import {
  detect,
} from 'detect-browser';

import * as routes from './routes';
import {
  store,
} from '../state/store';

export const graphqlQueryObject = (otherAddress) => `
{
  profile(id: "${otherAddress}") {
    name
    image
  }
}
`;

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
    secondRoute === routes.WALL ||
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

// get spaces row data out from spaces data
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

    const rowType = await Promise.all(rowCalls);

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

export const checkIsENSAddress = (string) => {
  const noSpace = /^\S*$/.test(string);
  if (!noSpace) return false;

  const isENSAddress = /([a-z0-9-]){3,}\.(eth)/i.test(string);
  return isENSAddress;
};

export const getFollowingProfiles = async (following) => {
  const {
    fetchedProfiles,
  } = store.getState().myData;
  const updatedFetchedProfiles = fetchedProfiles || {};
  const unfetchedProfiles = following.filter((user) => !updatedFetchedProfiles[user.message.identifier[1].value]);

  const fetchProfile = async (ethAddr) => Box.getProfile(ethAddr);
  const fetchUnfetchedProfiles = async () => Promise.all(unfetchedProfiles.map((user) => fetchProfile(user.message.identifier[1].value)));
  const profiles = await fetchUnfetchedProfiles();
  const followingAddress = [];

  // go through unfetched profiles and add to redux store
  unfetchedProfiles.forEach((user, i) => {
    const address = user.message.identifier[1].value;
    updatedFetchedProfiles[address] = profiles[i];
  });

  following.forEach((user) => {
    const address = user.message.identifier[1].value;
    const profile = updatedFetchedProfiles[address];
    followingAddress.push([profile, address]);
  });

  store.dispatch({
    type: 'MY_FETCHED_PROFILES_UPDATE',
    fetchedProfiles: updatedFetchedProfiles,
  });
  return followingAddress;
};

export const checkFollowing = (following, otherProfileAddress) => {
  if (!following) return false;
  return following.some((user) => user.message.identifier[1].value === otherProfileAddress);
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
    isSquarelink,
    isAuthereum,
  } = provider;

  if (isFortmatic || isPortis || isWalletConnect || isSquarelink || isAuthereum) return false;
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

export const checkIsMobileDevice = () => {
  return ((window && typeof window.orientation !== 'undefined')) || (navigator && navigator.userAgent.indexOf('IEMobile') !== -1);
};

export const sortChronologically = (threadPosts) => {
  const updatedThreadPosts = threadPosts.sort((a, b) => {
    a = a.timestamp;
    b = b.timestamp;
    return a > b ? -1 : a < b ? 1 : 0;
  });

  return updatedThreadPosts;
};

export const baseURL = (url) => url.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '');

export const fetchEthAddrByENS = async (name) => {
  try {
    const ensDomainRequest = {
      query: `{
        domains(where: { name : "${name}" }) {
          owner {
            id
          }
        }
      }`,
    };

    const res = await fetch('https://api.thegraph.com/subgraphs/name/ensdomains/ens', {
      method: 'POST',
      body: JSON.stringify(ensDomainRequest),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200 && res.status !== 201) throw new Error('Failed', res);

    const {
      data,
      errors,
    } = await res.json();
    if (data) return data.domains[0] && data.domains[0].owner.id;

    return errors;
  } catch (error) {
    console.log('ENS Request error:', error);
  }
};

export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}