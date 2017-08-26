import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Dashboard from '../containers/Dashboard/Dashboard';
import CalendarWrapper from '../containers/Calendar/CalendarWrapper';
import Cluster from '../containers/Cluster/Cluster';
import Employee from '../containers/Employee/Employee';

export default () => (
  <Switch>
    <Route path="/panel" component={Dashboard} />
    <Route path="/panel/calendars" component={CalendarWrapper} />
    <Route path="/panel/clusters" component={Cluster} />
    <Route path="/panel/employees" component={Employee} />
    <Redirect from="/" to="/panel" />
  </Switch>
);
