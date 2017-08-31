import React from 'react';
import PropTypes from 'prop-types';

const FormPassword = field => {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-error' : ''}`;
  const { label, name, input, placeholder, defaultValue } = field;
  const errorHelpBlockStyle = {
    display: `${touched && error ? 'block' : 'none'}`
  };

  return (
    <div className={className}>
      <label htmlFor={name}>
        {label}
      </label>
      <input
        type="password"
        className="form-control"
        placeholder={placeholder}
        value={defaultValue}
        {...input}
      />
      <span className="help-block" style={errorHelpBlockStyle}>{error}</span>
    </div>
  );
};

FormPassword.defaultProps = {
  label: ''
};

FormPassword.propTypes = {
  label: PropTypes.string,
};

export default FormPassword;
