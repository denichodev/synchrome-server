import React, { Component } from 'react';
import matchSorter from 'match-sorter';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
          route: 'employees',
          handleDelete: this.handleDeleteClick,
          Cell: ActionCell,
          filterable: false
        }
      ]
    };
  }

  componentDidMount() {
    const { fetchAllEmployee } = this.props;

    fetchAllEmployee();
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
          <div className="col-md-12 clear-padding">
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
