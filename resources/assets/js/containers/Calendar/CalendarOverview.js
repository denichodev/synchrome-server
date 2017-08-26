import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CalendarOverview extends Component {
  render() {
    return (
      <div>
        Calendar Overview
        <Link to="/panel/calendars/add-new">Add New</Link>
      </div>
    );
  }
}

export default CalendarOverview;
