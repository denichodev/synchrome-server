import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import { agencyActions } from '../../ducks/agency';
import { echelonActions } from '../../ducks/echelon';
import { employeeActions } from '../../ducks/employee';
import { allowancesActions } from '../../ducks/allowances';
import validator from '../../helpers/validator';
import {
  FormSelection,
  FormSelectionWithSearch,
  FormText
} from '../../components/Forms';

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
      id: 1,
      name: 'Married'
    },
    {
      id: 0,
      name: 'Unmarried'
    }
  ];

  constructor(props) {
    super(props);

    this.state = {
      agencyOptions: [],
      echelonOptions: [],
      allowanceOptions: []
    };
  }

  componentDidMount = () => {
    const {
      fetchAllAgency,
      fetchWorkshifts,
      dispatch,
      fetchReligions,
      fetchRanks,
      fetchAllowances
    } = this.props;

    fetchAllAgency();
    fetchWorkshifts();
    fetchReligions();
    fetchRanks();
    fetchAllowances();
    dispatch(
      initialize('newEmployeeForm', {
        workshift_id: 1,
        gender: 'm',
        married: 1,
        religion_id: 1,
        rank_id: '1A'
      })
    );
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

    if (nextProps.allowances.length > 0) {
      this.setAllowanceOptions(nextProps.allowances);
    }
  }

  setAllowanceOptions = allowanceData => {
    const allowanceOptions = allowanceData.map(alw => {
      return {
        value: alw.id,
        label: `${alw.name} | TPP ${alw.tpp} | MEAL ${alw.meal}`
      };
    });

    this.setState({
      allowanceOptions
    });
  };

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
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="row">
              <div className="col-md-3">
                <Field
                  label="NIP"
                  name="id"
                  component={FormText}
                  validate={[validator.required]}
                />
              </div>
              <div className="col-md-3">
                <Field
                  label="Name"
                  name="name"
                  component={FormText}
                  validate={[validator.required]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Field
                  label="Gender"
                  name="gender"
                  component={FormSelection}
                  optionsData={NewEmployee.genderOptions}
                  validate={[validator.required]}
                />
              </div>
              <div className="col-md-3">
                <Field
                  label="Religion"
                  name="religion_id"
                  optionsData={this.props.religions}
                  component={FormSelection}
                  validate={[validator.required]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Field
                  label="Phone"
                  name="phone"
                  component={FormText}
                  validate={[validator.required, validator.number]}
                />
              </div>
              <div className="col-md-3">
                <Field
                  label="Married"
                  name="married"
                  component={FormSelection}
                  optionsData={NewEmployee.maritalStatusOptions}
                  validate={[validator.required]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Field
                  label="Address"
                  name="address"
                  component={FormText}
                  validate={[validator.required]}
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
                  validate={[validator.required]}
                />
              </div>
              <div className="col-md-3">
                <Field
                  label="Workshift"
                  name="workshift_id"
                  component={FormSelection}
                  optionsData={workshifts}
                  validate={[validator.required]}
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
                  validate={[validator.required]}
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
                  validate={[validator.required]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Field
                  label="Allowance"
                  name="allowance_id"
                  optionsData={this.state.allowanceOptions}
                  defaultValue={''}
                  component={FormSelectionWithSearch}
                  validate={[validator.required]}
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

const formOptions = {
  form: 'newEmployeeForm'
};

const mapStateToProps = state => ({
  agency: state.agency,
  echelon: state.echelon,
  workshifts: state.employee.workshifts,
  religions: state.employee.religions,
  ranks: state.employee.ranks,
  allowances: state.allowances.data
});

const mapDispatchToProps = dispatch => ({
  fetchAllAgency: () => dispatch(agencyActions.fetchAllAgency()),
  fetchEchelonsById: id => dispatch(echelonActions.fetchEchelonsById(id)),
  postEmployee: data => dispatch(employeeActions.postEmployee(data)),
  fetchWorkshifts: () => dispatch(employeeActions.fetchWorkshift()),
  clearSelectedEchelon: () => dispatch(employeeActions.clearSelectedEchelon()),
  fetchReligions: () => dispatch(employeeActions.fetchAllReligion()),
  fetchRanks: () => dispatch(employeeActions.fetchAllRank()),
  fetchAllowances: () => dispatch(allowancesActions.fetchAllowances())
});

const Connector = connect(mapStateToProps, mapDispatchToProps)(NewEmployee);

export default reduxForm(formOptions)(Connector);
