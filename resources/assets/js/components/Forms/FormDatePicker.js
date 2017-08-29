import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const FormDatePicker = field => {
  const { meta: { pristine, error } } = field;
  const className = `form-group ${!pristine && error ? 'has-error' : ''}`;
  const { input, label, name, minDate, maxDate, calendarId } = field;
  const errorHelpBlockStyle = {
    visibility: `${!pristine && error ? 'visible' : 'hidden'}`
  };

  return (
    <div className={className}>
      <label htmlFor={name}>
        {label}
      </label>
      <div className="input-group">
        <div className="input-group-addon">
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
