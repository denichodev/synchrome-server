import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import AdminRoute from './AdminRoute';

import ClusterDetail from '../containers/Cluster/ClusterDetail';
import ClusterOverview from '../containers/Cluster/ClusterOverview';
import CalendarOverview from '../containers/Calendar/CalendarOverview';
import NewCalendar from '../containers/Calendar/NewCalendar';
import EditCalendar from '../containers/Calendar/EditCalendar';
import EmployeeOverview from '../containers/Employee/EmployeeOverview';
import NewEmployee from '../containers/Employee/NewEmployee';
import Dashboard from '../containers/Dashboard/Dashboard';
import UserOverview from '../containers/User/UserOverview';
import NewUser from '../containers/User/NewUser';
import EditUser from '../containers/User/EditUser';
import Error404 from '../containers/Error/Error404';
import AdminOnly from '../containers/Error/AdminOnly';

export default () => (
  <Switch>
    <Route exact path="/panel" component={Dashboard} />
    <Route exact path="/panel/calendars/add-new" component={NewCalendar} />
    <Route path="/panel/calendars/:id" component={EditCalendar} />
    <Route exact path="/panel/calendars" component={CalendarOverview} />
    <Route path="/panel/clusters/:id" component={ClusterDetail} />
    <Route exact path="/panel/clusters" component={ClusterOverview} />
    <Route path="/panel/employees/add-new" component={NewEmployee} />
    <Route exact path="/panel/employees" component={EmployeeOverview} />
    <Route exact path="/panel/users/add-new" component={NewUser} />
    <Route path="/panel/users/:id" component={EditUser} />
    <AdminRoute exact path="/panel/users" component={UserOverview} />
    <Route exact path="/not-found" component={Error404} />
    <Route exact path="/admin-only" component={AdminOnly} />
    <Redirect to="/not-found" />
  </Switch>
)
