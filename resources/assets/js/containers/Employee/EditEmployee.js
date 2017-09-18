import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import { agencyActions } from '../../ducks/agency';
import { echelonActions } from '../../ducks/echelon';
import { employeeActions } from '../../ducks/employee';
import {
  FormSelection,
  FormText,
  FormSelectionWithSearch
} from '../../components/Forms';

class EditEmployee extends Component {
  static genderOptions = [
    {
      id: 'm',
      name: 'Male'
    },
    {
      id: 'f',
      name: 'Female'
    }
  ];

  static maritalStatusOptions = [
    {
      id: 0,
      name: 'Unmarried'
    },
    {
      id: 1,
      name: 'Married'
    }
  ];

  constructor(props) {
    super(props);

    this.state = {
      echelonsFetched: false,
      agencyOptions: [],
      echelonOptions: []
    };
  }

  componentDidMount = () => {
    const {
      fetchAllAgency,
      fetchWorkshifts,
      fetchEmployeeById,
      fetchReligions,
      fetchRanks
    } = this.props;
    const id = this.props.match.params.id;
    fetchAllAgency();
    fetchWorkshifts();
    fetchReligions();
    fetchRanks();
    fetchEmployeeById(id);
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch, fetchEchelonsById } = this.props;

    if (nextProps.agency.data.length > 0) {
      this.setAgencyOptions(nextProps.agency.data);
    }

    if (nextProps.echelon.data.length > 0) {
      this.setEchelonOptions(nextProps.echelon.data);
    }

    if (nextProps.activeEmployee.id !== this.props.activeEmployee.id) {
      fetchEchelonsById(nextProps.activeEmployee.echelon.agency.id);
    }

    if (nextProps.echelon.data.length > 0 && !this.state.echelonsFetched) {
      this.setState({ echelonsFetched: true });
      console.log(nextProps.activeEmployee);
      dispatch(
        initialize('editEmployeeForm', {
          name: nextProps.activeEmployee.name,
          id: nextProps.activeEmployee.id,
          agency_id: nextProps.activeEmployee.echelon.agency.id,
          echelon_id: nextProps.activeEmployee.echelon.id,
          religion_id: nextProps.activeEmployee.religion.id,
          married: nextProps.activeEmployee.married === true ? 1 : 0,
          rank_id: nextProps.activeEmployee.rank.id,
          phone: nextProps.activeEmployee.phone,
          address: nextProps.activeEmployee.address,
          gender: nextProps.activeEmployee.gender,
          workshift_id: nextProps.activeEmployee.workshift.id
        })
      );
    }
  }

  setAgencyOptions = agencyData => {
    const agencyOptions = agencyData.map(agency => {
      return {
        value: agency.id,
        label: agency.name
      };
    });

    this.setState({
      agencyOptions
    });
  };

  setEchelonOptions = echelonData => {
    const echelonOptions = echelonData.map(echelon => {
      return {
        value: echelon.id,
        label: echelon.name
      };
    });

    this.setState({
      echelonOptions
    });
  };

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

  handleAgencyChange = value => {
    const { fetchEchelonsById, clearSelectedEchelon } = this.props;
    if (!value) {
      clearSelectedEchelon();
      return;
    }

    const val = Object.keys(value)
      .map(key => {
        if (typeof value[key] === 'string') {
          return value[key];
        }
        return null;
      })
      .join('');

    fetchEchelonsById(val);
  };

  onSubmit = values => {
    const { patchEmployee, match } = this.props;
    patchEmployee(match.params.id, values);
  };

  render() {
    const { handleSubmit, workshifts } = this.props;

    return (
      <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Add New Employee</h3>
        </div>
        <div className="box-body">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="row">
              <div className="col-md-3">
                <Field
                  label="NIP"
                  name="id"
                  component={FormText}
                />
              </div>
              <div className="col-md-3">
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
                  label="Gender"
                  name="gender"
                  component={FormSelection}
                  optionsData={EditEmployee.genderOptions}                    
                />
              </div>
              <div className="col-md-3">
                <Field
                  label="Religion"
                  name="religion_id"
                  optionsData={this.props.religions}
                  component={FormSelection}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Field
                  label="Phone"
                  name="phone"
                  component={FormText}
                />
              </div>
              <div className="col-md-3">
                <Field
                  label="Married"
                  name="married"
                  component={FormSelection}
                  optionsData={EditEmployee.maritalStatusOptions}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Field
                  label="Address"
                  name="address"
                  component={FormText}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Field
                  label="Rank"
                  name="rank_id"
                  component={FormSelection}
                  optionsData={this.props.ranks}
                />
              </div>
              <div className="col-md-3">
                <Field
                  label="Workshift"
                  name="workshift_id"
                  component={FormSelection}
                  optionsData={workshifts}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Field
                  label="Agency"
                  name="agency_id"
                  optionsData={this.state.agencyOptions}
                  onChange={this.handleAgencyChange}
                  defaultValue={''}
                  component={FormSelectionWithSearch}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Field
                  label="Echelon"
                  name="echelon_id"
                  optionsData={this.state.echelonOptions}
                  defaultValue={''}
                  component={FormSelectionWithSearch}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
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
  activeEmployee: state.employee.active,
  religions: state.employee.religions,
  ranks: state.employee.ranks
});

const mapDispatchToProps = dispatch => ({
  fetchAllAgency: () => dispatch(agencyActions.fetchAllAgency()),
  fetchEchelonsById: id => dispatch(echelonActions.fetchEchelonsById(id)),
  fetchWorkshifts: () => dispatch(employeeActions.fetchWorkshift()),
  fetchEmployeeById: id => dispatch(employeeActions.fetchEmployeeById(id)),
  clearSelectedEchelon: () => dispatch(employeeActions.clearSelectedEchelon()),
  patchEmployee: (id, data) => {
    dispatch(employeeActions.patchEmployee(id, data));
  },
  fetchReligions: () => dispatch(employeeActions.fetchAllReligion()),
  fetchRanks: () => dispatch(employeeActions.fetchAllRank())
});

const Decorated = reduxForm(formOptions)(EditEmployee);

export default connect(mapStateToProps, mapDispatchToProps)(Decorated);
