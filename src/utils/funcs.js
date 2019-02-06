import contractMap from 'eth-contract-metadata';
import {
  toChecksumAddress,
} from 'ethereumjs-util';

import * as routes from './routes';
import {
  store
} from '../state/store';

export const normalizeURL = (pathname) => {
  const lowercasePathname = pathname.toLowerCase();
  const fuzzyLowercasePathname = lowercasePathname.charAt(lowercasePathname.length - 1) === '/' ?
    lowercasePathname.slice(0, -1) :
    lowercasePathname;

  return fuzzyLowercasePathname;
};

export const matchProtectedRoutes = (normalizedPath) => {
  if (normalizedPath === routes.ACTIVITY ||
    normalizedPath === routes.DETAILS ||
    normalizedPath === routes.EDIT) {
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
  // limit to five calls a second
  const response = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${otherAddress}&apikey=${process.env.ETHERSCAN_TOKEN}`);
  if (response.status !== 200) {
    console.log(`Looks like there was a problem. Status Code: ${response.status}`);
    return;
  }
  const data = await response.json();
  // only proceed once second promise is resolved
  return data;
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

export async function getPublicProfile(graphqlQueryObject) {
  // let profile;
  // try {
  const profile = await Box.profileGraphQL(graphqlQueryObject); // eslint-disable-line no-undef
  // } catch (err) {
  //   // console.log(err);
  // }
  // return profile;
  return profile;
};

export const updateFeed = (publicProfileAddress, feedByAddress, checkedAddresses) => {
  console.log('checkedAddresses', checkedAddresses);
  if (publicProfileAddress) {
    store.dispatch({
      type: 'GET_PUBLIC_PROFILE_ACTIVITY',
      publicProfileActivity: feedByAddress,
      ifFetchingActivity: false,
    });
  } else {
    store.dispatch({
      type: 'UPDATE_ACTIVITY',
      feedByAddress,
      ifFetchingActivity: false,
      isLoggedIn: true,
    });
  }
};