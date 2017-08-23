import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Calendar from './Calendar/Calendar';

const EditCalendar = ({ match }) => {
  console.log(match.params.id);
  if (match.params.id) {
    console.log('true or not', match.params.id === 'add-new');
    if (match.params.id !== 'add-new') {
      return (
        <Calendar edit={true} id={match.params.id} />
      )
    }
  }
  return null;
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