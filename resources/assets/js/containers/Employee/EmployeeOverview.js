import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import matchSorter from 'match-sorter';
import { employeeActions } from '../../ducks/employee';
import FilterableTable from '../../components/DataTable/FilterableTable';

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
          <td colSpan="5">
            <center>No employee added yet</center>
          </td>
        </tr>
      );
    }

    return employeeData.map(emp => (
      <tr key={emp.id}>
        <td>{emp.id}</td>
        <td>{emp.name}</td>
        <td>{emp.echelon.agency.name}</td>
        <td>{emp.echelon.name}</td>
        <td>
          <Link
            to={`/panel/employees/${emp.id}`}
            className="btn btn-primary btn-xs"
          >
            Edit
          </Link>&nbsp;
          <button
            onClick={() => this.handleDeleteClick(emp.id)}
            type="button"
            className="btn btn-danger btn-xs"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  getEmployeeData = () => {
    const { employeeData } = this.props;

    return employeeData.map(emp => {
      return {
        id: emp.id,
        name: emp.name,
        agencyName: emp.echelon.agency.name,
        echelonName: emp.echelon.name
      };
    });
  }

  handleDeleteClick = id => {
    const { deleteEmployee } = this.props;
    deleteEmployee(id);
  };

  render() {
    console.log('employee data', this.getEmployeeData());
    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Employees</h3>
        </div>
        <div className="box-body">
          <div className="form-group pull-right">
            <Link className="btn btn-primary" to="/panel/employees/add-new">
              Add New Employee
            </Link>
          </div>
          {/* <table className="table table-striped table-bordered">
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
          </table> */}
          <div className="col-md-12">
            <FilterableTable
              data={mockData}
              columns={columns}
            />
          </div>
        </div>
      </div>
    );
  }
}

const columns = [
  {
    Header: 'NIP',
    accessor: 'id'
  },
  {
    Header: 'Name',
    accessor: 'name',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
    filterAll: true
  },
  {
    Header: 'Agency',
    accessor: 'agency'
  },
  {
    Header: 'Echelon',
    accessor: 'echelon'
  },
];

const mockData = [
  {
    id: '123124',
    name: 'Deni Cho',
    agency: 'Hello Agency',
    echelon: 'Hello Echelon'
  }
];

const mapStateToProps = state => ({
  employeeData: state.employee.data,
  employeeError: state.employee.error
});

const mapDispatchToProps = dispatch => ({
  fetchAllEmployee: () => dispatch(employeeActions.fetchAllEmployee()),
  fetchEmployeeById: id => dispatch(employeeActions.fetchEmployeeById(id)),
  deleteEmployee: id => dispatch(employeeActions.deleteEmployee(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeOverview);
