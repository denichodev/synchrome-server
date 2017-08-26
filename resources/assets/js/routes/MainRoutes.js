import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Cluster from '../containers/Cluster/Cluster'
import CalendarOverview from '../containers/Calendar/CalendarOverview';
import NewCalendar from '../containers/Calendar/NewCalendar';
import EditCalendar from '../containers/Calendar/EditCalendar';
import Employee from '../containers/Employee/Employee';

export default () => (
  <Switch>
    <Route exact path="/panel/calendars/add-new" component={NewCalendar} />
    <Route path="/panel/calendars/:id" component={EditCalendar} />
    <Route path="/panel/calendars" component={CalendarOverview} />
    <Route path="/panel/clusters" component={Cluster} />    
    <Route path="/panel/employees" component={Employee} />
    <Redirect from="/" to="/panel" />
  </Switch>
)
