import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Calendar from './Calendar';

import CalendarOverview from './CalendarOverview';

const EditCalendar = ({ match }) => {
  return (
    <Calendar edit={true} id={match.params.id ? match.params.id : null} />
  );
}

const NewCalendar = ({ match }) => {
  return (
    <Calendar edit={false} />
  );
}

class CalendarWrapper extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/panel/calendars" component={CalendarOverview} />
          <Route exact path="/panel/calendars/add-new" component={NewCalendar} />
          <Route path="/panel/calendars/:id" component={EditCalendar} />     
        </Switch>
      </div>
    );
  }
}

export default CalendarWrapper;