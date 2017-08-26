import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Header from '../components/AdminLTE/Header';
import Sidebar from '../components/AdminLTE/Sidebar';
import ContentWrapper from '../components/AdminLTE/ContentWrapper';

import AppRoutes from '../routes/AppRoutes';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header appName={this.props.initialState.appName} />
        <Sidebar />
        <ContentWrapper>
          <AppRoutes />        
        </ContentWrapper>
      </div>
    );
  }
}

export default App;
