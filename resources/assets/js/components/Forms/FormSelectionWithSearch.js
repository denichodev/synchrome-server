import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const FormSelectionWithSearch = field => {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-error' : ''}`;
  const { input, optionsData, label, clearable } = field;

  return (
    <div className={className}>
      <label className="control-label" htmlFor="name">
        {label}
      </label>
      <div>
        <Select
          {...input}
          options={optionsData}
          onChange={(value) => { input.onChange(value ? value.value : null); }}
          onBlur={() => { field.input.onBlur(field.input.value); }}
          clearable={clearable}
        />
      </div>
    </div>
  );
};

FormSelectionWithSearch.defaultProps = {
  optionsData: [],
  clearable: false
};

FormSelectionWithSearch.propTypes = {
  optionsData: PropTypes.array,
  label: PropTypes.string.isRequired,
  clearable: PropTypes.bool
};

export default FormSelectionWithSearch;
