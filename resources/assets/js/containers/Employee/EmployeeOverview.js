import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeeOverview extends Component {
  render() {
    return (
      <div>
        <Link to="/panel/employees/add-new">Add New</Link>
      </div>
    );
  }
}

export default EmployeeOverview;
