import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EventCalendar from './EventCalendar';

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendarTitle: '',
      publishType: 'published'
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCalendarSelection = this.handleCalendarSelection.bind(this);
    this.handlePublishOption = this.handlePublishOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCalendarSelection(start, end) {
    this.props.selectDateFromCalendar(start, end);
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

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    console.log(this.props);

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
                    <EventCalendar
                      height={530}
                      displayEventTime={false}
                      selectable
                      events={[]}
                      handleSelection={this.handleSelection}
                    />
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

export default Calendar;
