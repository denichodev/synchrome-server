import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import $ from 'jquery';
import moment from 'moment';
import 'fullcalendar/dist/fullcalendar';
import _ from 'lodash';
import { eventActions } from '../../ducks/event';
import { calendarActions } from '../../ducks/calendar';

class EventCalendar extends Component {
  constructor(props) {
    super(props);

    this.rerenderFullcalendar = this.rerenderFullcalendar.bind(this);
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
      displayEventTime,
      selectable,
      validRange,
      eventClick: this.handleEventClick,
      select: handleSelection,
      allDayDefault: true
    });

    const eventSource = events.map(ev => {
      return {
        ...ev,
        end: moment(ev.end).add(1, 'days')
      };
    });

    $('#calendar').fullCalendar('addEventSource', eventSource);
  }

  componentDidUpdate(prevProps, prevState) {
    this.rerenderFullcalendar();
    // console.log('prevprops', prevProps);
    // if (this.props.events.length) {
    //   const newEvents = _.differenceWith(
    //     this.props.events,
    //     prevProps.events,
    //     _.isEqual
    //   );

    //   if (newEvents.length) {
    //     this.rerenderFullcalendar();
    //   }
    // }
  }

  handleEventClick = (calEvent, jsEvent) => {
    const {
      removeEvent,
      addDeletedEvent,
      events,
      setEventForm,
      setEditStatus,
      setEventFormOriginalId
    } = this.props;

    if (jsEvent.originalEvent.shiftKey) {
      if (!calEvent.originalId) {
        removeEvent(calEvent.id);
        $('#calendar').fullCalendar('removeEvents', calEvent.id);
      } else {
        addDeletedEvent(calEvent.originalId);
        $('#calendar').fullCalendar('removeEvents', calEvent._id);
      }
    }

    let eventToEdit;

    if (!calEvent.originalId) {
      eventToEdit = _.find(events, { id: calEvent.id });
      setEventForm(eventToEdit);
      setEditStatus({
        target: calEvent,
        bool: true
      });
    } else {
      eventToEdit = _.find(events, { originalId: calEvent.originalId });
      setEventFormOriginalId(eventToEdit);
      setEditStatus({
        target: calEvent,
        bool: true
      });
    }
  };

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
      displayEventTime,
      selectable,
      validRange,
      eventClick: this.handleEventClick,
      select: handleSelection,
      allDayDefault: true
    });

    const eventSource = events.map(ev => {
      return {
        ...ev,
        end: moment(ev.end).add(1, 'days')
      };
    });

    $('#calendar').fullCalendar('addEventSource', eventSource);
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
};

const mapDispatchToProps = dispatch => ({
  removeEvent: id => dispatch(eventActions.removeEventToPost(id)),
  addDeletedEvent: orgId => dispatch(calendarActions.addDeletedEvent(orgId)),
  setEventForm: event => {
    dispatch(change('eventForm', 'title', event.title));
    dispatch(change('eventForm', 'start', moment(event.start)));
    dispatch(change('eventForm', 'end', moment(event.end)));
    dispatch(change('eventForm', 'event_category_id', event.event_category_id));
  },
  setEventFormOriginalId: event => {
    dispatch(change('eventForm', 'title', event.title));
    dispatch(change('eventForm', 'start', moment(event.start)));
    dispatch(change('eventForm', 'end', moment(event.end)));
    dispatch(change('eventForm', 'event_category_id', event.event_category_id));
  },
  clearActiveCalendar: () => dispatch(calendarActions.clearActiveCalendar()),
  clearActiveEvents: () => dispatch(eventActions.clarActiveEvents()),
  setEditStatus: status => dispatch(eventActions.setEditStatus(status))
});

export default connect(null, mapDispatchToProps)(EventCalendar);
