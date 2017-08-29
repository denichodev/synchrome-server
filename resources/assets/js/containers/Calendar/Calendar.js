import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { calendarActions } from '../../ducks/calendar';
import { eventActions } from '../../ducks/event';
import { FormSelection, FormText } from '../../components/Forms';
import EventCalendar from './EventCalendar';
import EventForm from './EventForm';

class Calendar extends Component {
  static publishTypes = [
    {
      name: 'Published',
      id: 'published'
    },
    {
      name: 'Draft',
      id: 'draft'
    }
  ];

  componentWillMount() {
    this.props.initialize({ status: 'published' });
  }

  componentDidMount = () => {
    const { edit, id, fetchCalendarById } = this.props;

    if (!edit) {
      return;
    }

    // fetchCalendarById(id);
  };

  handleSubmit = values => {
    const { postCalendar, eventToPost } = this.props;

    postCalendar(values, eventToPost);
  };

  handleSelection = (start, end) => {
    // SUBTRACTING 1 DAY because fullCalendar different way of rendering end date
    this.props.selectDateFromCalendar(
      start.toISOString(),
      end.add(-1, 'days').toISOString()
    );
  };

  renderEventCalendar = () => {
    const { eventToPost } = this.props;
    const { edit } = this.props;

    if (!edit) {
      return (
        <EventCalendar
          height={500}
          displayEventTime={false}
          selectable
          handleSelection={this.handleSelection}
          events={eventToPost}
        />
      );
    }

    if (edit) {
      return (
        <EventCalendar
          height={500}
          displayEventTime={false}
          selectable
          events={[]}
        />
      );
    }
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <div className="col-md-9">
          <div className="box">
            <div className="box-header">
              {this.props.edit
                ? `Edit Calendar ${this.props.id}`
                : 'Add New Calendar'}
            </div>
            <div className="box-body">
              <div className="row">
                <div className="col-sm-12">
                  <Field
                    name="name"
                    placeholder="Calendar Title"
                    component={FormText}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {/* this.renderCalendarTitle() */}
                  {this.renderEventCalendar()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">Publishing</div>
                <div className="box-body">
                  <form
                    className="form-group"
                    onSubmit={handleSubmit(this.handleSubmit)}
                  >
                    <Field
                      name="status"
                      defaultValue="published"
                      label="Status"
                      optionsData={Calendar.publishTypes}
                      component={FormSelection}
                    />
                    <button
                      style={{ marginTop: '10px' }}
                      type="submit"
                      className="btn btn-block btn-primary btn-lg"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">Event</div>
                <div className="box-body">
                  <EventForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Calendar.defaultProps = {
  edit: false,
  id: null
};

Calendar.propTypes = {
  edit: PropTypes.bool.isRequired,
  id: PropTypes.string
};

const mapStateToProps = state => ({
  activeCalendar: state.activeCalendar,
  eventToPost: state.event.toPost
});

const mapDispatchToProps = dispatch => ({
  fetchCalendarById: id => dispatch(calendarActions.fetchCalendarById(id)),
  selectDateFromCalendar: (start, end) => {
    dispatch(eventActions.calendarDateSelected(start, end));
  },
  postCalendar: (calendar, events) =>
    dispatch(calendarActions.postCalendar(calendar, events))
});

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  return errors;
};

const formOptions = {
  form: 'calendarForm',
  validate
};

export default reduxForm(formOptions)(
  connect(mapStateToProps, mapDispatchToProps)(Calendar)
);
