// Main Dependencies
import React from 'react';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';

// Store Middlewares
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware, routerActions } from 'react-router-redux';

// Actions & Reducerse
import rootReducer from '../ducks';
import actionCreators from '../ducks/actionCreators';

export const history = createBrowserHistory();

export const configureStore = (initialState) => {
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logger Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux Devtools configuration
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionCreators
    })
    : compose;
  
  // Applying middleware and composing enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Creating the store
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
