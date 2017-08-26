import http from '../services/http'

// Types
const FETCH_CALENDAR_ALL_REQUEST = 'synchrome/calendar/fetch_calendar_all_request';
const FETCH_CALENDAR_ALL_SUCCESS = 'synchrome/calendar/fetch_calendar_all_success';
const FETCH_CALENDAR_ALL_FAILURE = 'synchrome/calendar/fetch_calendar_all_failure';

const FETCH_CALENDAR_BYID_REQUEST = 'synchrome/calendar/fetch_calendar_byid_request';
const FETCH_CALENDAR_BYID_SUCCESS = 'synchrome/calendar/fetch_calendar_byid_success';
const FETCH_CALENDAR_BYID_FAILURE = 'synchrome/calendar/fetch_calendar_byid_failure';

export const calendarTypes = {
  FETCH_CALENDAR_ALL_REQUEST,
  FETCH_CALENDAR_ALL_SUCCESS,
  FETCH_CALENDAR_ALL_FAILURE,
  FETCH_CALENDAR_BYID_REQUEST,
  FETCH_CALENDAR_BYID_SUCCESS,
  FETCH_CALENDAR_BYID_FAILURE
}

// Action Creators
const fetchCalendarAllRequest = () => {
  return {
    type: FETCH_CALENDAR_ALL_REQUEST
  };
};

const fetchCalendarAllSuccess = payload => {
  return {
    type: FETCH_CALENDAR_ALL_SUCCESS,
    payload
  };
};

const fetchCalendarAllFailure = error => {
  return {
    type: FETCH_CALENDAR_ALL_FAILURE,
    payload: error
  };
};

const fetchCalendarByIdRequest = () => {
  return {
    type: FETCH_CALENDAR_BYID_REQUEST
  };
};

const fetchCalendarByIdSuccess = payload => {
  return {
    type: FETCH_CALENDAR_BYID_SUCCESS,
    payload
  }
}

const fetchCalendarByIdFailure = error => {
  return {
    type: FETCH_CALENDAR_BYID_FAILURE,
    payload: error
  }
}

const fetchAllCalendar = () => {
  // TODO: implement fetch all calendar using the http services
  

  return dispatch => {
    dispatch(fetchCalendarAllRequest());

    const successCallback = res => {
      dispatch(fetchCalendarAllSuccess(res.data.data));
    }
  
    const errorCallback = err => {
      dispatch(fetchCalendarAllFailure(err.message));
    }

    http.get('/calendar', successCallback, errorCallback);
  }

}

const fetchCalendarById = id => {
  // TODO: implement fetch calendar by an id to get the events
}

export const calendarActions = {
  fetchCalendarById,
  fetchAllCalendar
}

// All Calendar Reducer
const allCalendarInitialState = {
  error: '',
  data: []
};

const allCalendarReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CALENDAR_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case FETCH_CALENDAR_ALL_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Active Calendar Reducer
const activeCalendarInitialState = {
  error: '',
  data: []
};

const activeCalendarReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CALENDAR_BYID_SUCCESS:
      return action.payload;
    case FETCH_CALENDAR_BYID_FAILURE:
      return action.payload;
    default:
      return state;  
  }
}

export default {
  allCalendarReducer,
  activeCalendarReducer,
  activeCalendarInitialState,
  allCalendarInitialState
}
