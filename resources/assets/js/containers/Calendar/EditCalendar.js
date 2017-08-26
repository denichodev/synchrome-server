import React from 'react';

import Calendar from './Calendar';

const EditCalendar = ({ match }) => {
  return (
    <Calendar edit={true} id={match.params.id ? match.params.id : null} />
  );
};

export default EditCalendar;
