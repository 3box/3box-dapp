import { addLocaleData } from 'react-intl';
import enUS from './en-US';
import zhHANT from './zh-Hant';

addLocaleData(enUS.data);
addLocaleData(zhHANT.data);

export const getLocale = () => {
  const lang = localStorage.getItem('lang');
  switch (lang) {
    case 'tw':
      return zhHANT;
    case 'en':
      return enUS;
    default:
      return enUS;
  }
};

export default {
  getLocale,
};
