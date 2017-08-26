import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router';

import App from '../containers/App';

import Main from '../containers/Main/Main';

export default () => (
  <App>
    <Route path="/" component={Main} />
  </App>
);
