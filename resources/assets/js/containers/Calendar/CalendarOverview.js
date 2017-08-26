import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CalendarOverview extends Component {
  render() {
    return (
      <div className="box">
        <div className="box-body">
          <div className="form-group pull-right">
            <Link className="btn btn-primary" to="/panel/calendars/add-new">Add New Calendar</Link>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Calendar Name</th>
                <th>Date Range</th>
                <th>Actions</th>
              </tr>
            </thead>
            
          </table>
        </div>
      </div>
    );
  }
}

export default CalendarOverview;
