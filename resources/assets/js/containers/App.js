import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import Calendar from './Calendar/Calendar';

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

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/dashboard/calendars/add-new" component={NewCalendar} />
          <Route path="/dashboard/calendars/:id" component={EditCalendar} />     
        </Switch>
      </div>
    );
  }
}

export default App;