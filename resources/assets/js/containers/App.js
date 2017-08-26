import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Header from '../components/AdminLTE/Header';

import AppRoutes from '../routes/AppRoutes';

class App extends Component {
  render() {
    return (
      <div>
        <Header appName={this.props.initialState.appName} />
        <AppRoutes />
      </div>
    );
  }
}

export default App;
