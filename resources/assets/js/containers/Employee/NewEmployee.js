import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import { agencyActions } from '../../ducks/agency';
import { echelonActions } from '../../ducks/echelon';
import { employeeActions } from '../../ducks/employee';
import { FormSelection, FormSelectionWithSearch } from '../../components/Forms';

class NewEmployee extends Component {
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
      agencyOptions: [],
      echelonOptions: []
    };
  }

  componentDidMount = () => {
    const { fetchAllAgency, fetchWorkshifts, dispatch, fetchReligions, fetchRanks } = this.props;

    fetchAllAgency();
    fetchWorkshifts();
    fetchReligions();
    fetchRanks();
    dispatch(initialize('newEmployeeForm', {
      workshift_id: 1,
      gender: 'm',
      married: false
    }));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.agency.data.length > 0) {
      this.setAgencyOptions(nextProps.agency.data);
    }

    if (!nextProps.echelon.data) {
      this.setState({
        echelonOptions: []
      });
      return;
    }

    if (nextProps.echelon.data.length > 0) {
      this.setEchelonOptions(nextProps.echelon.data);
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
        <label className="col-sm-2 control-label" htmlFor={name}>{label}</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            {...input}
          />
        </div>
      </div>
    );
  };

  renderAgenciesDropdown = field => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const { label, name, input } = field;
    const { agency } = this.props;
    return (
      <div className={className}>
        <label className="col-sm-2 control-label" htmlFor={name}>{label}</label>
        <div className="col-sm-10">
          <select className="form-control" onChange {...input}>
            {agency.data.map(row => {
              return (
                <option key={row.id} value={row.id}>
                  {row.name}
                </option>
              );
            })}
          </select>
        </div>
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
          <label className="col-sm-2 control-label" htmlFor={name}>{label}</label>
          <div className="col-sm-10">
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
        </div>
      );
    }

    return (
      <div className={className}>
        <label className="col-sm-2" htmlFor={name}>{label}</label>
        <div className="col-sm-10">
          <select className="form-control" {...input} />
        </div>
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
    const { postEmployee } = this.props;

    postEmployee(values);
  };

  render() {
    const { handleSubmit, workshifts } = this.props;

    return (
      <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Add New Employee</h3>
        </div>
        <div className="box-body">
          <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <Field label="ID" name="id" component={this.renderTextField} />                
                  <Field
                    label="Name"
                    name="name"
                    component={this.renderTextField}
                  />
                  <Field
                    label="Gender"
                    name="gender"
                    component={FormSelection}
                    optionsData={NewEmployee.genderOptions}                    
                  />
                  <Field
                    label="Address"
                    name="address"
                    component={this.renderTextField}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    component={this.renderTextField}
                  />
                  <Field
                    label="Religion"
                    name="religion_id"
                    optionsData={this.props.religions}
                    component={FormSelection}
                  />
                  <Field
                    label="Married"
                    name="married"
                    component={FormSelection}
                    optionsData={NewEmployee.maritalStatusOptions}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <Field
                  label="Rank"
                  name="rank_id"
                  component={FormSelection}
                  optionsData={this.props.ranks}
                />
                <Field
                  label="Agency"
                  name="agency_id"
                  optionsData={this.state.agencyOptions}
                  onChange={this.handleAgencyChange}
                  defaultValue={''}
                  component={FormSelectionWithSearch}
                />
                <Field
                  label="Echelon"
                  name="echelon_id"
                  optionsData={this.state.echelonOptions}
                  defaultValue={''}
                  component={FormSelectionWithSearch}
                />
                <Field
                  label="Workshift"
                  name="workshift_id"
                  component={FormSelection}
                  optionsData={workshifts}
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
  form: 'newEmployeeForm',
  validate
};

const mapStateToProps = state => ({
  agency: state.agency,
  echelon: state.echelon,
  workshifts: state.employee.workshifts,
  religions: state.employee.religions,
  ranks: state.employee.ranks
});

const mapDispatchToProps = dispatch => ({
  fetchAllAgency: () => dispatch(agencyActions.fetchAllAgency()),
  fetchEchelonsById: id => dispatch(echelonActions.fetchEchelonsById(id)),
  postEmployee: data => dispatch(employeeActions.postEmployee(data)),
  fetchWorkshifts: () => dispatch(employeeActions.fetchWorkshift()),
  clearSelectedEchelon: () => dispatch(employeeActions.clearSelectedEchelon()),
  fetchReligions: () => dispatch(employeeActions.fetchAllReligion()),
  fetchRanks: () => dispatch(employeeActions.fetchAllRank())
});

const Connector = connect(mapStateToProps, mapDispatchToProps)(NewEmployee);

export default reduxForm(formOptions)(Connector);
