import React from 'react';
import PropTypes from 'prop-types';

const FormText = field => {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-error' : ''}`;
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

FormText.propTypes = {
  label: PropTypes.string,
  placeHolder: PropTypes.string
};

export default FormText;
