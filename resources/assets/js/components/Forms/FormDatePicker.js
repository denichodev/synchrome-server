import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';

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
          id={calendarId}
          value={input.value}
          onChange={input.onChange}
          className={`form-control`}
          minDate={minDate ? minDate : null}
          maxDate={maxDate ? maxDate : null}
        />
      </div>
      <span className="help-block" style={errorHelpBlockStyle}>{error}</span>
    </div>
  );
};

export default FormDatePicker;
