import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App.jsx';
import { store } from './state/store';
import history from './utils/history';
import { unregister } from './registerServiceWorker';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
unregister();
// registerServiceWorker();
