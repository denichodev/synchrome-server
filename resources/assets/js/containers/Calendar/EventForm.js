import React, { Component } from 'react';
import { Field, reduxForm, reset, change } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { eventActions } from '../../ducks/event';
import { calendarActions } from '../../ducks/calendar';
import { FormSelection, FormText, FormDatePicker } from '../../components/Forms';

class EventForm extends Component {
  componentWillMount() {
    this.props.initialize({ event_category_id: '1' });
  }

  componentDidMount() {
    const { fetchCategories } = this.props;

    fetchCategories();
  }

  generateRandomId = () => {
    const { eventToPost, edit, eventsFromCalendar } = this.props;

    const rand = _.random(9999);

    if (_.find(eventToPost, { id: rand }) !== undefined) {
      return this.generateRandomId();
    }

    if (edit) {
      if (_.find(eventsFromCalendar, { originalId: rand }) !== undefined) {
        return this.generateRandomId();
      }
    }

    return rand;
  }

  handleSubmitButton = values => {
    if (!values.end || !values.start) {
      return;
    }
    if (moment(values.end).isBefore(moment(values.start))) {
      return;
    }

    if (!this.props.isEditing.bool) { this.addEvent(values); }
    else {
      this.editEvent(values);
    }
  }

  addEvent = values => {
    const { addEventToPost } = this.props;

    const eventToPost = { ...values };

    // default event category id is workday
    if (!eventToPost.event_category_id) {
      eventToPost.event_category_id = '1';
    }

    eventToPost.end = moment(values.end).format('YYYY-MM-DD');

    eventToPost.id = this.generateRandomId();
    addEventToPost(eventToPost);
    this.forceUpdate();
  }

  editEvent = values => {
    const { editEventFromCalendar, eventsFromCalendar, isEditing, eventToPost, editEventToPost } = this.props;
    eventToPost.end = moment(values.end).format('YYYY-MM-DD');

    if (isEditing.target.originalId) {
      const targetEvent = {
        ..._.find(eventsFromCalendar, { originalId: isEditing.target.originalId }),
        start: values.start,
        end: values.end,
        title: values.title,
        event_category_id: values.event_category_id
      };
      editEventFromCalendar(this.props.eventsFromCalendar, targetEvent);

    } else {
      const targetEvent = {
        ..._.find(eventToPost, { id: isEditing.target.id }),
        start: values.start,
        end: values.end,
        title: values.title,
        event_category_id: values.event_category_id
      };
      editEventToPost(eventToPost, targetEvent);
    }
  }

  render() {
    const { categories, handleSubmit, isEditing } = this.props;
    return (
      <form className="form-group" onSubmit={handleSubmit(this.handleSubmitButton)}>
        <div className="row">
          <div className="col-md-12 form-group">
            <Field
              name="event_category_id"
              label="Category"
              optionsData={categories}
              component={FormSelection}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 form-group">
            <Field
              name="title"
              label="Title"
              placeholder="Event Title"
              component={FormText}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Field
              calendarId="start-event-datepicker"
              label="Start Date"
              name="start"
              component={FormDatePicker}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Field
              calendarId="end-event-datepicker"
              label="End Date"
              name="end"
              end
              component={FormDatePicker}
            />
          </div>
        </div>
        <button className="btn btn-block btn-primary btn-lg">{isEditing.bool ? 'Edit' : 'Add'} Event</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.event.category,
  eventToPost: state.event.toPost,
  eventsFromCalendar: state.activeCalendar.data.events,
  isEditing: state.event.isEditing
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(eventActions.fetchEventCategory()),
  addEventToPost: (data) => {
    dispatch(eventActions.addEventToPost(data));
  },
  editEventFromCalendar: (events, editedEvent) => dispatch(calendarActions.editEvent(events, editedEvent)),
  editEventToPost: (events, editedEvent) => dispatch(eventActions.editEvent(events, editedEvent))
});

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.start) {
    errors.start = 'Required';
  }
  if (!values.end) {
    errors.end = 'Required';
  }

  if (moment(values.end).isBefore(moment(values.start))) {
    errors.end = 'Must be after start date';
  }

  return errors;
};

const formOptions = {
  form: 'eventForm',
  validate
};

export default reduxForm(formOptions)(connect(mapStateToProps, mapDispatchToProps)(EventForm));
