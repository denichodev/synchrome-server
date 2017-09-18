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
      <div className="input-group fix-height">
        <div className="input-group-addon fix-height">
          <i className="fa fa-calendar" />
        </div>
        <DatePicker
          selected={input.value}
          onChange={input.onChange}
          className={'form-control'}
        />
      </div>
      <span className="help-block" style={errorHelpBlockStyle}>{error}</span>
    </div>
  );
};

export default FormDatePicker;
