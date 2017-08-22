import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Calendar from './Calendar/Calendar';

const EditCalendar = ({ match }) => {
  return (
    <Calendar edit id={match.params.id ? match.params.id : null} />
  )
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/dashboard/calendars/add-new" component={Calendar} />
          <Route path="/dashboard/calendars/:id" component={EditCalendar} />     
        </div>   
      </Router>
    );
  }
}

export default App;