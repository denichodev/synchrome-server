import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import matchSorter from 'match-sorter';
import { employeeActions } from '../../ducks/employee';
import { FilterableTable, ActionCell } from '../../components/DataTable';

class EmployeeOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
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
          accessor: 'agency',
          filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['agency'] }),
          filterAll: true
        },
        {
          Header: 'Echelon',
          accessor: 'echelon',
          filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['echelon'] }),
          filterAll: true
        },
        {
          Header: 'Actions',
          filterable: false,
          Cell: ActionCell
        }
      ]
    };
  }

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
        agency: emp.echelon.agency.name,
        echelon: emp.echelon.name
      };
    });
  }

  handleDeleteClick = id => {
    const { deleteEmployee } = this.props;
    deleteEmployee(id);
  };

  render() {
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
              data={this.getEmployeeData()}
              columns={this.state.columns}
            />
          </div>
        </div>
      </div>
    );
  }
}

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
