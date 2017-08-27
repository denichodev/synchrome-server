import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

class NewEmployee extends Component {
  
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
        { error }
      </div>
    );
  };

  onSubmit = values => {
    console.log('VALUES', values);
  }
  
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        New Employee
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            label="Name"
            name="testName"
            placeholder="Enter Name"
            component={this.renderTextField}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.testName) {
    errors.testName = 'Nama tidak boleh kosong'
  }

  return errors;
}

const formOptions = {
  form: 'newEmployeeForm',
  validate
};

export default reduxForm(formOptions)(NewEmployee);
