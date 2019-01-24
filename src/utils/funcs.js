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

export const addLocalStorage = () => {
  if (!window.localStorage) {
    Object.defineProperty(window, 'localStorage', new(function addLocalStorageToWindow() {
      const aKeys = [],
        oStorage = {};
      Object.defineProperty(oStorage, 'getItem', {
        value: function (sKey) {
          return this[sKey] ? this[sKey] : null;
        },
        writable: false,
        configurable: false,
        enumerable: false
      });
      Object.defineProperty(oStorage, 'key', {
        value: function (nKeyId) {
          return aKeys[nKeyId];
        },
        writable: false,
        configurable: false,
        enumerable: false
      });
      Object.defineProperty(oStorage, 'setItem', {
        value: function (sKey, sValue) {
          if (!sKey) {
            return;
          }
          document.cookie = escape(sKey) + '=' + escape(sValue) + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/';
        },
        writable: false,
        configurable: false,
        enumerable: false
      });
      Object.defineProperty(oStorage, 'length', {
        get: function () {
          return aKeys.length;
        },
        configurable: false,
        enumerable: false
      });
      Object.defineProperty(oStorage, 'removeItem', {
        value: function (sKey) {
          if (!sKey) {
            return;
          }
          document.cookie = escape(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        },
        writable: false,
        configurable: false,
        enumerable: false
      });
      Object.defineProperty(oStorage, 'clear', {
        value: function () {
          if (!aKeys.length) {
            return;
          }
          for (let sKey in oStorage) {
            document.cookie = escape(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          }
        },
        writable: false,
        configurable: false,
        enumerable: false
      });
      this.get = function () {
        let iThisIndx;
        for (let sKey in oStorage) {
          iThisIndx = aKeys.indexOf(sKey);
          if (iThisIndx === -1) {
            oStorage.setItem(sKey, oStorage[sKey]);
          } else {
            aKeys.splice(iThisIndx, 1);
          }
          delete oStorage[sKey];
        }
        for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {
          oStorage.removeItem(aKeys[0]);
        }
        for (let aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
          aCouple = aCouples[nIdx].split(/\s*=\s*/);
          if (aCouple.length > 1) {
            oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
            aKeys.push(iKey);
          }
        }
        return oStorage;
      };
      this.configurable = false;
      this.enumerable = true;
    })());
  }
};