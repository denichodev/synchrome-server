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
  return dispatch => {
    dispatch(fetchCalendarAllRequest());

    const success = res => {
      dispatch(fetchCalendarAllSuccess(res.data.data));
    }
  
    const error = err => {
      dispatch(fetchCalendarAllFailure(err.message));
    }

    http.get('/calendar', success, error);
  }

}

const fetchCalendarById = id => {
  return dispatch => {
    dispatch(fetchCalendarByIdRequest());

    const success = res => {
      dispatch(fetchCalendarByIdSuccess(res.data.data));
    }

    const error = err => {
      dispatch(fetchCalendarByIdFailure(err.message));
    }

    http.get(`/calendar/${id}`, success, error);
  }
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
  data: {}
};

const activeCalendarReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CALENDAR_BYID_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_CALENDAR_BYID_FAILURE:
      return {
        ...state,
        error: action.payload
      };
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
