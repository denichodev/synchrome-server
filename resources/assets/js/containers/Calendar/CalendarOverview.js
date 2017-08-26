import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { calendarActions } from '../../ducks/calendar';

class CalendarOverview extends Component {
  componentDidMount() {
    const { fetchAllCalendar } = this.props;

    fetchAllCalendar();
  }
  
  render() {
    return (
      <div className="box">
        <div className="box-body">
          <div className="form-group pull-right">
            <Link className="btn btn-primary" to="/panel/calendars/add-new">Add New Calendar</Link>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Calendar Name</th>
                <th>Date Range</th>
                <th>Actions</th>
              </tr>
            </thead>
            
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  calendars: state.calendars
})

const mapDispatchToProps = dispatch => ({
  fetchAllCalendar: () => dispatch(calendarActions.fetchAllCalendar())  
})

export default connect(mapStateToProps,mapDispatchToProps)(CalendarOverview);
