import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { employeeActions } from '../../ducks/employee';

class EmployeeOverview extends Component {
  componentDidMount() {
    const { fetchAllEmployee } = this.props;

    fetchAllEmployee();
  }

  renderEmployeeTable() {
    const { employeeData } = this.props;

    if (employeeData.length <= 0) {
      return (
        <tr>
          <td colSpan="5"><center>No employee added yet</center></td>
        </tr>
      );
    }

    return (
      employeeData.map((emp) => (
        <tr key={emp.id}>
          <td>{emp.id}</td>
          <td>{emp.name}</td>
          <td>{emp.echelon.agency.name}</td>
          <td>{emp.echelon.name}</td>
          <td>
            <Link to={`/panel/employees/${emp.id}`} className="btn btn-primary btn-xs">Edit</Link>&nbsp;
            <button type="button" className="btn btn-danger btn-xs">Delete</button>
          </td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <div className="box">
        <div className="box-body">
          <div className="form-group pull-right">
            <Link className="btn btn-primary" to="/panel/employees/add-new">Add New Employee</Link>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>NIP</th>
                <th>Name</th>
                <th>Agency</th>
                <th>Echelon</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.renderEmployeeTable()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employeeData: state.employee.data,
  employeeError: state.employee.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllEmployee: () => dispatch(employeeActions.fetchAllEmployee()),
  fetchEmployeeById: (id) => dispatch(employeeActions.fetchEmployeeById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeOverview);
