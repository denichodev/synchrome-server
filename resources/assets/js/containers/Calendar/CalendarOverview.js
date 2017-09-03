import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { calendarActions } from '../../ducks/calendar';

class CalendarOverview extends Component {
  componentDidMount() {
    const { fetchAllCalendar } = this.props;

    fetchAllCalendar();
  }

  renderCalendarTable = () => {
    const { calendarData } = this.props;

    if (calendarData.length <= 0) {
      return (
        <tr>
          <td colSpan="3"><center>No calendar added yet</center></td>
        </tr>
      );
    }

    return (
      calendarData.map(cal => (
        <tr key={cal.id}>
          <td>{cal.name}</td>
          <td><strong>{cal.start}</strong> s/d <strong>{cal.end}</strong></td>
          <td>
            <Link to={`/panel/calendars/${cal.id}`} className="btn btn-xs btn-primary">View/Edit</Link>&nbsp;
            <button onClick={() => this.handleCalendarDelete(cal.id)} type="submit" className="btn btn-xs btn-danger">Delete</button>
          </td>
        </tr>
      ))
    );
  }

  handleCalendarDelete = (id) => {
    const { deleteCalendar } = this.props;
    deleteCalendar(id);
  };

  render() {
    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Calendars</h3>
        </div>
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
            <tbody>
              {this.renderCalendarTable()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  calendarData: state.calendars.data,
  calendarError: state.calendars.error
});


const mapDispatchToProps = dispatch => ({
  fetchAllCalendar: () => dispatch(calendarActions.fetchAllCalendar()),
  fetchCalendarById: id => dispatch(calendarActions.fetchCalendarById(id)),
  deleteCalendar: id => dispatch(calendarActions.deleteCalendar(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarOverview);
