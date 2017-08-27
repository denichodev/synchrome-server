import http from '../services/http'

// Types
const FETCH_CALENDAR_ALL_REQUEST = 'synchrome/calendar/fetch_calendar_all_request';
const FETCH_CALENDAR_ALL_SUCCESS = 'synchrome/calendar/fetch_calendar_all_success';
const FETCH_CALENDAR_ALL_FAILURE = 'synchrome/calendar/fetch_calendar_all_failure';

const FETCH_CALENDAR_BYID_REQUEST = 'synchrome/calendar/fetch_calendar_byid_request';
const FETCH_CALENDAR_BYID_SUCCESS = 'synchrome/calendar/fetch_calendar_byid_success';
const FETCH_CALENDAR_BYID_FAILURE = 'synchrome/calendar/fetch_calendar_byid_failure';

const POST_CALENDAR_REQUEST = 'synchrome/calendar/post_calendar_request';
const POST_CALENDAR_SUCCESS = 'synchrome/calendar/post_calendar_all_success';
const POST_CALENDAR_FAILURE = 'synchrome/calendar/post_calendar_failure';

export const calendarTypes = {
  FETCH_CALENDAR_ALL_REQUEST,
  FETCH_CALENDAR_ALL_SUCCESS,
  FETCH_CALENDAR_ALL_FAILURE,
  FETCH_CALENDAR_BYID_REQUEST,
  FETCH_CALENDAR_BYID_SUCCESS,
  FETCH_CALENDAR_BYID_FAILURE,
  POST_CALENDAR_REQUEST,
  POST_CALENDAR_SUCCESS,
  POST_CALENDAR_FAILURE
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

const postCalendarRequest = () => {
  return {
    type: POST_CALENDAR_REQUEST
  }
}

const postCalendarSuccess = payload => ({
  type: POST_CALENDAR_SUCCESS,
  payload
});

const postCalendarFailure = payload => ({
  type: POST_CALENDAR_FAILURE,
  payload
});

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

const postCalendar = (calendar, events) => {
  // MANIPULATE HERE

  const data = {
    ...calendar,
    events: [...events]
  };

  console.log('CALENDAR API DATA :', data);

  return dispatch => {
    dispatch(postCalendarRequest());

    const success = res => {
      dispatch(postCalendarSuccess(res.data.data));
    }

    const failure = err => {
      dispatch(postCalendarFailure(err.message));
    }
  }
}

export const calendarActions = {
  fetchCalendarById,
  fetchAllCalendar,
  postCalendar
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
    case POST_CALENDAR_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case POST_CALENDAR_FAILURE:
      return {
        ...state,
        error: action.payload
      }  
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
