import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';

import { calendarActions } from '../../ducks/calendar';

import EventCalendar from './EventCalendar';

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarTitle: '',
      publishType: 'published',
      categories: null,
      eventToPush: {
        id: this.generateEventId(),
        title: '',
        categoryId: '1',
        start: '',
        end: ''
      },
      eventsToPost: []
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCalendarSelection = this.handleCalendarSelection.bind(this);
    this.handlePublishOption = this.handlePublishOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleEventTitleChange = this.handleEventTitleChange.bind(this);
    this.generateEventId = this.generateEventId.bind(this);
    this.findEvent = this.findEvent.bind(this);
  }

  fetchCategories() {
    const token = document.head.querySelector('meta[name="jwt-token"]').content;    
    axios
      .get('http://localhost:8000/api/int/calendar/event/category', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.setState({
          categories: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchCategories();

    const { edit, fetchCalendar, id } = this.props;
    if (!edit) { return; }

    fetchCalendar(id);
  }

  handleCalendarSelection(start, end) {
    console.log('SELECTED: ', start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
    
    this.setState({
      eventToPush: {
        ...this.state.eventToPush,
        start: start.format('YYYY-MM-DD'),
        end: end.format('YYYY-MM-DD')
      }
    });
  }

  handleTitleChange(e) {
    this.setState({
      calendarTitle: e.target.value
    });
  }

  handlePublishOption(e) {
    this.setState({
      publishType: e.target.value
    });
  }

  handleAddEvent(e) {
    e.preventDefault();
    
    this.setState({
      eventsToPost: this.state.eventsToPost.concat(this.state.eventToPush),
      eventToPush: {
        id: this.generateEventId(),
        title: '',
        categoryId: '1',
        start: '',
        end: ''
      }
    });
  }

  findEvent(id) {    
    if (!this.state) { return null; }

    let event = _.find(this.state.eventsToPost, o => {
      return o.id == id;
    });

    if (typeof event != 'undefined') {
      return event
    }

    return null;
  }

  generateEventId() {
    let id = _.random(1, 720)

    if (this.findEvent(id) != null) {
      return this.generateEventId()
    }

    return id
  }

  handleCategorySelect(e) {
    this.setState({
      eventToPush: {
        ...this.state.eventToPush,              
        categoryId: e.target.value
      }
    });
  }

  handleEventTitleChange(e) {
    this.setState({
      eventToPush: {
        ...this.state.eventToPush,      
        title: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  renderCategoriesOption() {
    const { categories } = this.state;

    if (!categories) { return; }

    return (
      <select value={this.state.eventToPush.categoryId} onChange={this.handleCategorySelect} name="category" id="publish-type" className="form-control">
        {categories.map(category => {
          return (
            <option key={category.id} value={category.id}>{category.name}</option>
          );
        })}
      </select>
    );
  }

  renderEventCalendar() {
    const eventsToShow = (this.props.calendar.events);
    const { edit } = this.props;
    console.log('events to post', this.state.eventsToPost);

    if (!edit) {
      return (
        <EventCalendar
          height={500}
          displayEventTime={false}
          selectable
          events={this.state.eventsToPost}
          handleSelection={this.handleCalendarSelection}
        />
      )
    }

    if (edit && eventsToShow) {
      return (
        <EventCalendar
          height={500}
          displayEventTime={false}
          selectable
          events={eventsToShow}
          handleSelection={this.handleCalendarSelection}
        />
      );
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="card-header">{this.props.edit ? `Edit Calendar ${this.props.id}` : 'Add New Calendar'}</div>
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-12 from-group">
                    <input
                      className="form-control"
                      onChange={this.handleTitleChange}
                      value={this.state.calendarTitle}
                      type="text"
                      placeholder="Calendar Title"
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
                <div className="card">
                  <div className="card-header">
                    Publishing  
                  </div>
                  <div className="card-block">
                    <form className="form-group" onSubmit={this.handleSubmit}>
                      <label htmlFor="publish-type"><strong>Status</strong></label>
                      <select value={this.state.publishType} onChange={this.handlePublishOption} name="publish-type" id="publish-type" className="form-control">
                        <option value="published" defaultValue>Published</option>
                        <option value="draft">Draft</option>
                      </select>
                      <button style={{marginTop: '10px'}} type="submit" className="btn btn-block btn-primary btn-lg">Save</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    Event  
                  </div>
                  <div className="card-block">
                    <form className="form-group" onSubmit={this.handleAddEvent}>
                      <label htmlFor="category"><strong>Category</strong></label>
                      {this.renderCategoriesOption()}
                      <label htmlFor="event-title"><strong>Title</strong></label>      
                      <input className="form-control" type="text" value={this.state.eventToPush.title} onChange={this.handleEventTitleChange} />
                      <button style={{marginTop: '10px'}} className="btn btn-block btn-primary btn-lg">Add Event</button>
                    </form>
                  </div>
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
}

Calendar.propTypes = {
  edit: PropTypes.bool.isRequired,
  id: PropTypes.string
}

const mapStateToProps = state => ({
  calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
  fetchCalendar: id => dispatch(calendarActions.fetchCalendar(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
