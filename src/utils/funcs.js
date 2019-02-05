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

// fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${otherAddress}&apikey=3VTI9D585DCX4RD4QSP3MYWKACCIVZID23`)
//   .then(
//     (response) => {
//       if (response.status !== 200) {
//         console.log(`Looks like there was a problem. Status Code: ${response.status}`);
//         return;
//       }
//       response.json()
//         .then((data) => {
//           if (data.status === '1') {
//             contractData = JSON.parse(data.result);
//             abiDecoder.addABI(contractData);
//             txGroup[otherAddress].map((lineItem, index) => {
//               const methodCall = abiDecoder.decodeMethod(txGroup[otherAddress][index].input);
//               lineItem.methodCall = methodCall && methodCall.name && (methodCall.name.charAt(0).toUpperCase() + methodCall.name.slice(1)).replace(/([A-Z])/g, ' $1').trim();
//             });
//           }
//         });
//     },
//   )
//   .catch((err) => {
//     console.log('Fetch Error :-S', err);
//   });