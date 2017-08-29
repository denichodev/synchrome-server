import React from 'react';
import PropTypes from 'prop-types';

const FormText = field => {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-error' : ''}`;
  const { label, name, input, placeholder, defaultValue } = field;
  const errorHelpBlockStyle = {
    visibility: `${touched && error ? 'visible' : 'hidden'}`
  };
  
  return (
    <div className={className}>
      <label htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={defaultValue}
        {...input}
      />
      <span className="help-block" style={errorHelpBlockStyle}>{error}</span>
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
