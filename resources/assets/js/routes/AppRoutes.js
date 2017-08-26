import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Dashboard from '../containers/Dashboard/Dashboard';
import CalendarWrapper from '../containers/Calendar/CalendarWrapper';
import Cluster from '../containers/Cluster/Cluster';
import Employee from '../containers/Employee/Employee';

export default () => (
  <Switch>
    <Route path="/dashobard" component={Dashboard} />
    <Route path="/dashboard/calendars" component={CalendarWrapper} />
    <Route path="/dashboard/clusters" component={Cluster} />
    <Route path="/dashboard/employees" component={Employee} />
    <Redirect from="/" to="/dahsboard" />
  </Switch>
);
