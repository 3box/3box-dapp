import contractMap from 'eth-contract-metadata';
import {
  toChecksumAddress,
} from 'ethereumjs-util';

import * as routes from './routes';

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

export async function fetchAsync(otherAddress) {
  const response = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${otherAddress}&apikey=3VTI9D585DCX4RD4QSP3MYWKACCIVZID23`);
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
