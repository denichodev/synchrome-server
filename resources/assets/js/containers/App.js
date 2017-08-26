import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import AppRoutes from '../routes/AppRoutes';

class App extends Component {
  render() {
    return (
      <div>
        <AppRoutes />
      </div>
    );
  }
}

export default App;
