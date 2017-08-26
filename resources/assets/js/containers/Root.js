import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import RootRoutes from '../routes/RootRoutes';

export default function Root({ store, history }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RootRoutes />
      </ConnectedRouter>
    </Provider>
  );
}
