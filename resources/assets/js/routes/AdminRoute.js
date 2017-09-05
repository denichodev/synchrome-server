import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={props => (
        rest.isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/admin-only',
          }}
          />
        )
      )}
    />
  )
};


const mapStateToProps = state => ({
  isAuthed: state.user.loggedIn.role.id === 1
});

export default connect(mapStateToProps, null)(AdminRoute);
