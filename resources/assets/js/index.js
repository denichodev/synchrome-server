import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { configureStore, history } from './stores/configureStore.dev';

import App from './containers/App';

const initialState = {};

const store = configureStore(initialState);
  
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App initialState={window.__INITIAL_STATE__} />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);
