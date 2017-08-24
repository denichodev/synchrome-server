import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware, routerActions } from 'react-router-redux';

import rootReducer from './ducks';
import App from './containers/App';

const initialState = {};
const history = createBrowserHistory();

const configureStore = (initialState) => {
  const middleware = [];
  const enhancers = [];

  middleware.push(thunk);

  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);

  const router = routerMiddleware(history);
  middleware.push(router);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
  })
  : compose;
  
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);
  
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
}

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App /> 
    </ConnectedRouter>
  </Provider>
  , document.getElementById('cal')
);
