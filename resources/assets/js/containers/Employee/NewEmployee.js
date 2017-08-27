import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { agencyActions } from '../../ducks/agency';
import { echelonActions } from '../../ducks/echelon';

class NewEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agency: null,
      echelon: null
    };
  };

  componentDidMount = () => {
    const { fetchAllAgency } = this.props;

    fetchAllAgency();
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

  renderAgenciesDropdown = (field) => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const { label, name, input } = field;
    const { agency, onChange } = this.props;

    return (
      <div className={className}>
        <label htmlFor={name}>{label}</label>
        <select 
          className="form-control"
          onChange
          {...input}
        >
          {agency.data.map((row) => {
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

  renderEchelonsDropdown = (field) => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const { label, name, input } = field;
    const { echelon } = this.props;

    if (echelon != null) {
      return (
        <div className={className}>
          <label htmlFor={name}>{label}</label>
          <select 
            className="form-control"
            {...input}
          >
            {echelon.data.map((row) => {
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
        <select 
          className="form-control"
          {...input}
        >
        </select>
      </div>
    );
  };

  handleAgencyChange = (e) => {
    console.log('Boom');

    const { fetchEchelonsById } = this.props;

    fetchEchelonsById(e.target.value);
  }

  onSubmit = values => {
    console.log('VALUES', values);
  }
  
  render() {
    const { handleSubmit } = this.props;

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
                  label="ID"
                  name="id"
                  component={this.renderTextField}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Field
                  label="Name"
                  name="name"
                  component={this.renderTextField}
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
                  component={this.renderEchelonsDropdown}
                />
              </div>
            </div>
            <div class="form-group">
              <button type="submit" className="btn btn-primary">Save</button>
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
    errors.name = 'Nama tidak boleh kosong'
  }

  return errors;
}

const formOptions = {
  form: 'newEmployeeForm',
  validate
};

const mapStateToProps = (state) => ({
  agency: state.agency,
  echelon: state.echelon
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllAgency: () => dispatch(agencyActions.fetchAllAgency()),
  fetchEchelonsById: (id) => dispatch(echelonActions.fetchEchelonsById(id))
});

const Connector = connect(mapStateToProps, mapDispatchToProps)(NewEmployee);

export default reduxForm(formOptions)(Connector);
