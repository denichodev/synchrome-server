import React, { Component } from 'react';

import Calendar from './Calendar';

const NewCalendar = ({ match }) => {
  return (
    <Calendar edit={false} />
  );
}

export default NewCalendar;