import React from 'react';
import DatePicker from 'react-datepicker';

const FormDatePicker = field => {
  const { meta: { pristine, error } } = field;
  const className = `form-group ${!pristine && error ? 'has-error' : ''}`;
  const { input, label, name } = field;
  const errorHelpBlockStyle = {
    display: `${!pristine && error ? 'block' : 'none'}`
  };

  return (
    <div className={className}>
      <label htmlFor={name}>
        {label}
      </label>
      <DatePicker
        selected={input.value}
        onChange={input.onChange}
        className={'form-control'}
      />
      <span className="help-block" style={errorHelpBlockStyle}>{error}</span>
    </div>
  );
};

export default FormDatePicker;
