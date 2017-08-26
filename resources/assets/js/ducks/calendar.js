import axios from 'axios';

// Types
const FETCH_CALENDAR_REQUEST = 'synchrome/calendar/fetch_calendar_request';
const FETCH_CALENDAR_SUCCESS = 'synchrome/calendar/fetch_calendar_success';
const FETCH_CALENDAR_FAILURE = 'synchrome/calendar/fetch_calendar_failure';

export const calendarTypes = {
  FETCH_CALENDAR_REQUEST,
  FETCH_CALENDAR_SUCCESS,
  FETCH_CALENDAR_FAILURE
};

// Action creators
const fetchCalendarRequest = () => {
  return {
    type: FETCH_CALENDAR_REQUEST
  }
}

const fetchCalendarSuccess = payload => {
  console.log('PAYLOAD: ', payload);
  return {
    type: FETCH_CALENDAR_SUCCESS,
    payload
  };
}

const fetchCalendarFailure = error => {
  return {
    type: FETCH_CALENDAR_FAILURE,
    error
  }
}

const fetchCalendar = (id) => {
  const token = document.head.querySelector('meta[name="jwt-token"]').content;
  return dispatch => {
    dispatch(fetchCalendarRequest());

    axios
      .get(`http://localhost:8000/api/int/calendar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log('RESPONSE:', res);
        dispatch(fetchCalendarSuccess(res.data.data));
      })
      .catch(err => {
        dispatch(fetchCalendarFailure(err.message));
      });
  };
};

export const calendarActions = {
  fetchCalendar
}

// Reducer
const calendarReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CALENDAR_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default calendarReducer;
