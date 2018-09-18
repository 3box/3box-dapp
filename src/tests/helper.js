import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import { addLocaleData, IntlProvider } from 'react-intl';

import locale from '../locales/en-US';

addLocaleData(locale.data);

// refer from https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl
export function renderWithIntl(element, root) {
  /* eslint-disable-next-line react/no-render-return-value */
  const instance = ReactDOM.render(
    <IntlProvider locale={locale.locale} messages={locale.messages}>
      {React.cloneElement(element)}
    </IntlProvider>,
    root,
  );

  return instance;
}

export function rendererCreateWithIntl(element) {
  const instance = renderer.create(
    <IntlProvider locale={locale.locale} messages={locale.messages}>
      {React.cloneElement(element)}
    </IntlProvider>,
  );

  return instance;
}
