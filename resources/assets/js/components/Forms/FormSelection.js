import React from 'react';
import PropTypes from 'prop-types';

const FormSelection = field => {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-error' : ''}`;  
  const { input, optionsData, defaultValue, label } = field;

  return (
    <div className={className}>
      <label htmlFor="name">{label}</label>  
      <select className="form-control" selected={defaultValue} {...input}>
        {optionsData.map(opt => {
          return (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

FormSelection.defaultProps = {
  optionsData: []
};

FormSelection.propTypes = {
  optionsData: PropTypes.array,
  label: PropTypes.string.isRequired
};

export default FormSelection;
