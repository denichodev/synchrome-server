import React, { Component } from 'react';
import $ from 'jquery';
import 'moment';
import 'fullcalendar/dist/fullcalendar';
import _ from 'lodash';

class EventCalendar extends Component {
  constructor(props) {
    super(props);

    this.rerenderFullcalendar = this.rerenderFullcalendar.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.events.length) {
      const newEvents = _.differenceWith(this.props.events, prevProps.events, _.isEqual);

      if (newEvents.length) {
        this.rerenderFullcalendar();
      }
    }
  }

  rerenderFullcalendar() {
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

    $('#calendar').fullCalendar('destroy');

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
      events: this.props.events,
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
