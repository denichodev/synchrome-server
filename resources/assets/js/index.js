import React from 'react';
import App from './containers/App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { configureStore, history } from './stores/configureStore.dev';
import { http } from './services/http';

import Root from './containers/Root';

const initialState = {};
const store = configureStore(initialState);

// Init HTTP service
http.init();
  
render(
  <Root store={store} history={history} />
  , document.getElementById('root')
);
