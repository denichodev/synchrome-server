import React, { Component } from 'react';
import $ from 'jquery';
import 'moment';
import 'fullcalendar/dist/fullcalendar';

class EventCalendar extends Component {
  componentDidMount() {
    const {
      defaultView,
      height,
      header,
      events,
      displayEventTime,
      selectable,
      handleSelection,
      validRange
    } = this.props;

    $('#calendar').fullCalendar({
      defaultView,
      height,
      header,
      events,
      displayEventTime,
      selectable,
      validRange,
      select: handleSelection
    });
  }

  render() {
    return <div id="calendar" />;
  }
}

EventCalendar.defaultProps = {
  defaultView: 'month',
  displayEventTime: 'false',
  selectable: false,
  handleSelection: (start, end) => {
    console.log(start, end);
  },
  validRange: {
    start: '2017-01-01',
    end: '2017-12-31'
  }
}

export default EventCalendar;
