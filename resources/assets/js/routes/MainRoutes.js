import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import ClusterOverview from '../containers/Cluster/ClusterOverview';
import CalendarOverview from '../containers/Calendar/CalendarOverview';
import NewCalendar from '../containers/Calendar/NewCalendar';
import EditCalendar from '../containers/Calendar/EditCalendar';
import EmployeeOverview from '../containers/Employee/EmployeeOverview';
import NewEmployee from '../containers/Employee/NewEmployee';
import Dashboard from '../containers/Dashboard/Dashboard';

export default () => (
  <Switch>
    <Route exact path="/panel" component={Dashboard} />
    <Route exact path="/panel/calendars/add-new" component={NewCalendar} />
    <Route path="/panel/calendars/:id" component={EditCalendar} />
    <Route path="/panel/calendars" component={CalendarOverview} />
    <Route path="/panel/clusters" component={ClusterOverview} />
    <Route path="/panel/employees/add-new" component={NewEmployee} />
    <Route path="/panel/employees" component={EmployeeOverview} />
    <Redirect from="/" to="/panel" />
  </Switch>
)
