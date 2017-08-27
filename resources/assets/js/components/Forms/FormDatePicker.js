import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';

const FormDatePicker = field => {
  const { meta: { pristine, error } } = field;
  // const className = `form-group ${!pristine && error ? 'has-error' : ''}`;
  const { input, label, name, minDate, maxDate, calendarId } = field;

  return (
    <DatePicker
      id={calendarId}
      value={input.value}
      onChange={input.onChange}
      className={`form-control`}
      minDate={minDate ? minDate : null}
      maxDate={maxDate ? maxDate : null}
    />
  );
};

export default FormDatePicker;
