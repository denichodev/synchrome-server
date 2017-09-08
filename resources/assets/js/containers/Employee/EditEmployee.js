import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import { agencyActions } from '../../ducks/agency';
import { echelonActions } from '../../ducks/echelon';
import { employeeActions } from '../../ducks/employee';
import { FormSelection, FormText } from '../../components/Forms';

class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      echelonsFetched: false
    };
  }

  componentDidMount = () => {
    const { fetchAllAgency, fetchWorkshifts, fetchEmployeeById } = this.props;
    const id = this.props.match.params.id;
    fetchAllAgency();
    fetchWorkshifts();
    fetchEmployeeById(id);
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch, fetchEchelonsById } = this.props;

    if (nextProps.activeEmployee.id !== this.props.activeEmployee.id) {
      fetchEchelonsById(nextProps.activeEmployee.echelon.agency.id);
    }

    if (nextProps.echelon.data.length > 0 && !this.state.echelonsFetched) {
      this.setState({ echelonsFetched: true });
      dispatch(initialize('editEmployeeForm', {
        name: nextProps.activeEmployee.name,
        id: nextProps.activeEmployee.id,
        agency_id: nextProps.activeEmployee.echelon.agency.id,
        echelon_id: nextProps.activeEmployee.echelon.id,
        workshift_id: nextProps.activeEmployee.workshift.id
      }));
    }
  }

  renderTextField = field => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const { label, name, input, placeholder } = field;

    return (
      <div className={className}>
        <label htmlFor={name}>{label}</label>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          {...input}
        />
      </div>
    );
  };

  renderAgenciesDropdown = field => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const { label, name, input } = field;
    const { agency, onChange } = this.props;

    return (
      <div className={className}>
        <label htmlFor={name}>{label}</label>
        <select className="form-control" onChange={onChange} {...input}>
          {agency.data.map(row => {
            return (
              <option key={row.id} value={row.id}>
                {row.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  renderEchelonsDropdown = field => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const { label, name, input } = field;
    const { echelon } = this.props;

    if (echelon != null) {
      return (
        <div className={className}>
          <label htmlFor={name}>{label}</label>
          <select className="form-control" {...input}>
            {echelon.data.map(row => {
              return (
                <option key={row.id} value={row.id}>
                  {row.name}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

    return (
      <div className={className}>
        <label htmlFor={name}>{label}</label>
        <select className="form-control" {...input} />
      </div>
    );
  };

  handleAgencyChange = e => {
    const { fetchEchelonsById } = this.props;

    fetchEchelonsById(e.target.value);
  };

  onSubmit = values => {
    const { patchEmployee, match } = this.props;
    patchEmployee(match.params.id, values);
  };

  render() {
    const { handleSubmit, workshifts, echelon, activeEmployee } = this.props;

    return (
      <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Add New Employee</h3>
        </div>
        <div className="box-body">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="row">
              <div className="col-md-3">
                <Field label="ID" name="id" component={FormText} />
              </div>
              <div className="col-md-3">
                <Field label="Workshift" name="workshift_id" component={FormSelection} optionsData={workshifts} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Field
                  label="Name"
                  name="name"
                  component={FormText}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Field
                  label="Agency"
                  name="agency_id"
                  component={this.renderAgenciesDropdown}
                  onChange={this.handleAgencyChange}
                />
              </div>
              <div className="col-md-3">
                <Field
                  label="Echelon"
                  name="echelon_id"
                  component={FormSelection}
                  optionsData={echelon.data}
                  defaultValue={activeEmployee.echelon ? activeEmployee.echelon.id : 0}
                />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Nama tidak boleh kosong';
  }

  return errors;
};

const formOptions = {
  form: 'editEmployeeForm',
  validate
};

const mapStateToProps = state => ({
  agency: state.agency,
  echelon: state.echelon,
  workshifts: state.employee.workshifts,
  activeEmployee: state.employee.active
});

const mapDispatchToProps = dispatch => ({
  fetchAllAgency: () => dispatch(agencyActions.fetchAllAgency()),
  fetchEchelonsById: id => dispatch(echelonActions.fetchEchelonsById(id)),
  fetchWorkshifts: () => dispatch(employeeActions.fetchWorkshift()),
  fetchEmployeeById: id => dispatch(employeeActions.fetchEmployeeById(id)),
  patchEmployee: (id, data) => {
    dispatch(employeeActions.patchEmployee(id, data));
  }
});

const Decorated = reduxForm(formOptions)(EditEmployee);

export default connect(mapStateToProps, mapDispatchToProps)(Decorated);
