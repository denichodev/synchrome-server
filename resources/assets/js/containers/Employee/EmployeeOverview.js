import React, { Component } from 'react';
import matchSorter from 'match-sorter';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { employeeActions } from '../../ducks/employee';
import { agencyActions } from '../../ducks/agency';
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
    const { fetchAllAgency } = this.props;

    fetchAllAgency();
  }

  getAgencyData = () => {
    const { agencyData } = this.props;

    const data = agencyData.map(agency => {
      return {
        value: agency.id,
        label: agency.name
      };
    });

    data.unshift({
      value: null,
      label: 'Choose Agency'
    });

    return data;
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

  handleAgencyChange = event => {
    const { fetchEmployeeByAgency } = this.props;
    fetchEmployeeByAgency(event.target.value);
  }

  render() {
    const { agencyData } = this.props;

    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Employees</h3>
        </div>
        <div className="box-body">
          <div className="form-group pull-left">
            <select className="form-control" onChange={this.handleAgencyChange}>
              <option value="" disabled selected>Choose Agency</option>
              {agencyData.map(agency => (
                <option key={agency.id} value={agency.id}>{agency.name}</option>
              ))}
            </select>
          </div>
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
  agencyData: state.agency.data,
  employeeData: state.employee.data,
  employeeError: state.employee.error
});

const mapDispatchToProps = dispatch => ({
  fetchAllAgency: () => dispatch(agencyActions.fetchAllAgency()),
  fetchAllEmployee: () => dispatch(employeeActions.fetchAllEmployee()),
  fetchEmployeeById: id => dispatch(employeeActions.fetchEmployeeById(id)),
  fetchEmployeeByAgency: id => dispatch(employeeActions.fetchEmployeeByAgency(id)),
  deleteEmployee: id => dispatch(employeeActions.deleteEmployee(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeOverview);
