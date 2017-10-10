import React from 'react';
import PropTypes from 'prop-types';

const FormText = field => {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-error' : ''}`;
  const { label, name, input, placeholder, defaultValue, disabled } = field;
  const errorHelpBlockStyle = {
    display: `${touched && error ? 'block' : 'none'}`
  };

  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={defaultValue}
        disabled={disabled}
        {...input}
      />
      <span className="help-block" style={errorHelpBlockStyle}>
        {error}
      </span>
    </div>
  );
};

FormText.defaultProps = {
  placeholder: '',
  label: ''
};

FormText.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string
};

export default FormText;
