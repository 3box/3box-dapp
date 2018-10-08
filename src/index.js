import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import { store } from './state/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

// window.addEventListener('load', () => {
//   // could remove and only use lib/web3utils
//   const hasWeb3 = typeof window.web3 !== 'undefined';
//   const web3 = hasWeb3 ? new Eth(window.web3.currentProvider) : null;
//   store.dispatch(updateWeb3Status(web3));
// });
