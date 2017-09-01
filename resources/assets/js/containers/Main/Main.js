import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/AdminLTE/Header';
import Sidebar from '../../components/AdminLTE/Sidebar';
import { userActions } from '../../ducks/user';

import MainRoutes from '../../routes/MainRoutes';

const initialState = window.__INITIAL_STATE__;

class Main extends Component {
  componentDidMount() {
    const { fetchLoggedInUser } = this.props;

    fetchLoggedInUser();
  }
  
  render() {  
    return (
      <div className="app">
        <Header 
          appName={initialState.appName} 
          appAbbr={initialState.appAbbr}
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

const mapDispatchToProps = dispatch => ({
  fetchLoggedInUser: () => dispatch(userActions.checkLoggedInUser())
});

export default connect(null, mapDispatchToProps)(Main);
