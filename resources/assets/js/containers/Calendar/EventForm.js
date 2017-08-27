import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { InputGroup } from 'react-bootstrap';
import moment from 'moment';

import { eventActions } from '../../ducks/event';
import { FormSelection, FormText, FormDatePicker } from '../../components/Forms';

class EventForm extends Component {
  componentDidMount() {
    const { fetchCategories } = this.props;

    fetchCategories()
  }

  handleAddEvent = values => {
    const { addEventToPost } = this.props;

    // ADDING 1 DAY because fullCalendar different way of rendering end date
    values.end = moment(values.end).add(1, 'days').toISOString();

    addEventToPost(values);
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
          <div className="col-md-12 form-group">
            <label htmlFor="start-date">
              <strong>Start</strong>
            </label>
            <InputGroup>
              <div className="input-group-addon">
                <i className="fa fa-calendar" />
              </div>
              <Field
                calendarId='start-event-datepicker'
                label="Start Date"
                name="start"
                component={FormDatePicker}
              />
            </InputGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 form-group">
            <InputGroup>
              <div className="input-group-addon">
                <i className="fa fa-calendar" />
              </div>
              <Field
                calendarId='end-event-datepicker'
                label="End Date"
                name="end"
                component={FormDatePicker}
              />
            </InputGroup>
          </div>
        </div>
        <button className="btn btn-block btn-primary btn-lg">Add Event</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.event.category
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(eventActions.fetchEventCategory()),
  addEventToPost: (data) => dispatch(eventActions.addEventToPost(data))
})

const formOptions = {
  form: 'eventForm'
}

export default reduxForm(formOptions)(connect(mapStateToProps,mapDispatchToProps)(EventForm));
