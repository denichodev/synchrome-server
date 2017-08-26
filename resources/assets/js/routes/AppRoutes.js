import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router';

import Dashboard from '../containers/Dashboard/Dashboard';
import CalendarWrapper from '../containers/Calendar/CalendarWrapper';
import Cluster from '../containers/Cluster/Cluster';
import Employee from '../containers/Employee/Employee';

export default () => (
  <Switch>
    <Route exact path="/panel" component={Dashboard} />
    <Route exact path="/panel/calendars" component={CalendarWrapper} />
    <Route exact path="/panel/clusters" component={Cluster} />
    <Route exact path="/panel/employees" component={Employee} />
    <Redirect from="/" to="/panel" />
  </Switch>
);
