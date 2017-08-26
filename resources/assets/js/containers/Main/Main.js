import React, { Component } from 'react';

import Header from '../../components/AdminLTE/Header';
import Sidebar from '../../components/AdminLTE/Sidebar';

import MainRoutes from '../../routes/MainRoutes';

const initialState = window.__INITIAL_STATE__;

class Main extends Component {
  render() {  
    return (
      <div className="app">
        <Header 
          appName={initialState.appName} 
          userName={initialState.userName} 
          userEmail={initialState.userEmail} 
          csrfToken={initialState.csrfToken}
        />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header"></section>
          <section className="content">
            <MainRoutes />
          </section>
        </div>
      </div>
    );
  }
}

export default Main;