import React, { Component } from 'react';

import Header from '../../components/AdminLTE/Header';
import Sidebar from '../../components/AdminLTE/Sidebar';

import MainRoutes from '../../routes/MainRoutes';

class Main extends Component {
  render() {
    return (
      <div className="app">
        <Header />
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