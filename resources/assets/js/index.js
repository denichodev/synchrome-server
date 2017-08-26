import React from 'react';
import App from './containers/App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { configureStore, history } from './stores/configureStore.dev';
import { http } from './services/http';

const initialState = {};
const store = configureStore(initialState);

// Init HTTP service
http.init();
  
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App initialState={window.__INITIAL_STATE__} />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);
