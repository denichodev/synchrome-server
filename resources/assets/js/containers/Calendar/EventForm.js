import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { eventActions } from '../../ducks/event';
import { FormSelection, FormText, FormDatePicker } from '../../components/Forms';

class EventForm extends Component {
  componentWillMount() {
    this.props.initialize({ category_id: '1' });
  }

  componentDidMount() {
    const { fetchCategories } = this.props;

    fetchCategories();
  }

  generateRandomId = () => {
    const { eventToPost } = this.props;

    const rand = _.random(999);
    if (_.find(eventToPost, { id: rand }) !== undefined) {
      console.log('there is something same');
      return this.generateRandomId();
    }
    return rand;
  }

  handleAddEvent = values => {
    const { addEventToPost } = this.props;

    // ADDING 1 DAY because fullCalendar different way of rendering end date
    const eventToPost = values;
    eventToPost.end = moment(values.end).add(1, 'days').toISOString();
    eventToPost.id = this.generateRandomId();
    addEventToPost(eventToPost);
  }

  render() {
    const { categories, handleSubmit } = this.props;
    return (
      <form className="form-group" onSubmit={handleSubmit(this.handleAddEvent)}>
        <div className="row">
          <div className="col-md-12 form-group">
            <Field
              name="category_id"
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
              component={FormDatePicker}
            />
          </div>
        </div>
        <button className="btn btn-block btn-primary btn-lg">Add Event</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.event.category,
  eventToPost: state.event.toPost
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(eventActions.fetchEventCategory()),
  addEventToPost: (data) => dispatch(eventActions.addEventToPost(data))
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

export default reduxForm(formOptions)(connect(mapStateToProps,mapDispatchToProps)(EventForm));
