import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';

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

  constructor(props) {
    super(props);

    this.state = {
      initializedFormOnEdit: false
    };
  }

  componentWillMount() {
    const {
      edit,
      initialize,
      clearActiveCalendar,
      clearActiveEvents
    } = this.props;
    clearActiveCalendar();
    clearActiveEvents();
    if (!edit) {
      initialize({ status: 'published' });
    }
  }

  componentDidMount = () => {
    const { edit, id, fetchCalendarById } = this.props;

    if (!edit) {
      return;
    }

    fetchCalendarById(id);
  };

  componentWillReceiveProps(nextProps) {
    const { edit, initialize, dispatch } = this.props;

    if (!edit || !nextProps.activeCalendar.data.name) {
      return;
    }
    if (this.state.initializedFormOnEdit) {
      return;
    }

    const initialForm = {
      status: 'published',
      name: nextProps.activeCalendar.data.name
    };

    dispatch(initialize(initialForm));
    this.setState({ initializedFormOnEdit: true });
  }

  handleSubmit = values => {
    const {
      postCalendar,
      eventToPost,
      dispatch,
      edit,
      patchCalendar,
      activeCalendar,
      id
    } = this.props;

    if (!edit) {
      postCalendar(values, eventToPost);
    } else {
      const updatedEvents = activeCalendar.data.events.filter(event => {
        return event.updated === true;
      });
      patchCalendar(
        id,
        values,
        eventToPost,
        activeCalendar.deleted,
        updatedEvents
      );
    }

    dispatch(reset('calendarForm'));
  };

  handleSelection = (start, end) => {
    // SUBTRACTING 1 DAY because fullCalendar different way of rendering end date
    const { setEventEditStatus } = this.props;

    setEventEditStatus({
      bool: false,
      target: {}
    });

    this.props.selectDateFromCalendar(start, end.add(-1, 'days'));
  };

  renderEventCalendar = () => {
    const { eventToPost, edit, activeCalendar } = this.props;

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

    const events = activeCalendar.data.events
      ? activeCalendar.data.events.concat(eventToPost)
      : [];

    if (edit) {
      return (
        <EventCalendar
          height={500}
          displayEventTime={false}
          selectable
          handleSelection={this.handleSelection}
          events={events}
        />
      );
    }
  };

  render() {
    const { handleSubmit, activeCalendar } = this.props;

    return (
      <div className="row">
        <div className="col-md-9">
          <div className="box">
            <div className="box-header">
              {this.props.edit
                ? `Edit ${activeCalendar.data.name
                    ? activeCalendar.data.name
                    : ''}`
                : 'Add New Calendar'}
            </div>
            <div className="box-body">
              <div className="row">
                <div className="col-sm-12">
                  <Field
                    name="name"
                    placeholder="Calendar Title"
                    defaultValue="Kalender"
                    component={FormText}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {/* this.renderCalendarTitle() */}
                  {this.renderEventCalendar()}
                  <div className="pull-right">
                    <i
                      className="fa fa-info-circle"
                      style={{ color: '#3482b4' }}
                    />{' '}
                    Shift + Click to remove event
                  </div>
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
                  <EventForm edit={this.props.edit} />
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
    dispatch(calendarActions.postCalendar(calendar, events)),
  patchCalendar: (id, calendar, newEvents, deletedList, updatedList) =>
    dispatch(
      calendarActions.patchCalendar(
        id,
        calendar,
        newEvents,
        deletedList,
        updatedList
      )
    ),
  setEventEditStatus: data => {
    dispatch(reset('eventForm'));
    dispatch(eventActions.setEditStatus(data));
  },
  clearActiveCalendar: () => dispatch(calendarActions.clearActiveCalendar()),
  clearActiveEvents: () => dispatch(eventActions.clarActiveEvents())
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
