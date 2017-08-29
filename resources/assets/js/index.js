import React from 'react';
import App from './containers/App';
import moment from 'moment';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { configureStore, history } from './stores/configureStore.dev';
import { initialState } from './ducks/index';
import http from './services/http';

import Root from './containers/Root';

const store = configureStore(initialState);

// Init HTTP service
http.init();
// moment.lang('id');

render(
  <Root store={store} history={history} />
  , document.getElementById('root')
);
