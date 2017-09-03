import moment from 'moment';
import { push } from 'react-router-redux';
import http from '../services/http';

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

const PATCH_CALENDAR_REQUEST = 'synchrome/calendar/patch_calendar_request';
const PATCH_CALENDAR_SUCCESS = 'synchrome/calendar/patch_calendar_success';
const PATCH_CALENDAR_FAILURE = 'synchrome/calendar/patch_calendar_failure';

const DELETE_CALENDAR_REQUEST = 'synchrome/calendar/delete_calendar_request';
const DELETE_CALENDAR_SUCCESS = 'synchrome/calendar/delete_calendar_success';
const DELETE_CALENDAR_FAILURE = 'synchrome/calendar/delete_calendar_failure';

const CLEAR_ACTIVE_CALENDAR = 'synchrome/calendar/clear_active_calendar';

const ADD_DELETED_EVENT = 'synchrome/calendar/add_deleted_event';

const EDIT_EVENT = 'synchrome/calendar/edit_event';

export const calendarTypes = {
  FETCH_CALENDAR_ALL_REQUEST,
  FETCH_CALENDAR_ALL_SUCCESS,
  FETCH_CALENDAR_ALL_FAILURE,
  FETCH_CALENDAR_BYID_REQUEST,
  FETCH_CALENDAR_BYID_SUCCESS,
  FETCH_CALENDAR_BYID_FAILURE,
  POST_CALENDAR_REQUEST,
  POST_CALENDAR_SUCCESS,
  POST_CALENDAR_FAILURE,
  PATCH_CALENDAR_REQUEST,
  PATCH_CALENDAR_SUCCESS,
  PATCH_CALENDAR_FAILURE,
  ADD_DELETED_EVENT,
  EDIT_EVENT,
  DELETE_CALENDAR_FAILURE,
  DELETE_CALENDAR_REQUEST,
  DELETE_CALENDAR_SUCCESS,
  CLEAR_ACTIVE_CALENDAR
};

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
  };
};

const fetchCalendarByIdFailure = error => {
  return {
    type: FETCH_CALENDAR_BYID_FAILURE,
    payload: error
  }
}

const postCalendarRequest = () => {
  return {
    type: POST_CALENDAR_REQUEST
  };
};

const postCalendarSuccess = payload => ({
  type: POST_CALENDAR_SUCCESS,
  payload
});

const postCalendarFailure = payload => ({
  type: POST_CALENDAR_FAILURE,
  payload
});

const patchCalendarRequest = () => {
  return {
    type: PATCH_CALENDAR_REQUEST
  }
};

const patchCalendarSuccess = payload => ({
  type: PATCH_CALENDAR_SUCCESS,
  payload
});

const patchCalendarFailure = payload => ({
  type: PATCH_CALENDAR_FAILURE,
  payload
});

const deleteCalendarRequest = () => {
  return {
    type: DELETE_CALENDAR_REQUEST
  }
};

const deleteCalendarSuccess = payload => ({
  type: DELETE_CALENDAR_SUCCESS,
  payload
});

const deleteCalendarFailure = payload => ({
  type: DELETE_CALENDAR_FAILURE,
  payload
});

const addDeletedEvent = payload => ({
  type: ADD_DELETED_EVENT,
  payload
});

const clearActiveCalendar = () => ({
  type: CLEAR_ACTIVE_CALENDAR
});

const deleteCalendar = id => {
  return dispatch => {
    dispatch(deleteCalendarRequest());

    const success = res => {
      dispatch(deleteCalendarSuccess(res.data.data));
      dispatch(fetchAllCalendar());
    };

    const error = err => {
      dispatch(deleteCalendarFailure(err.message));
    };

    http.delete(`/calendar/${id}`, success, error);
  };
};

const editEvent = (events, editedEvent) => {
  const copy = events;
  const newEvents = copy.map(eve => {
    if (eve.originalId === editedEvent.originalId) {
      return {
        ...eve,
        title: editedEvent.title,
        start: editedEvent.start,
        end: editedEvent.end,
        updated: true
      };
    }
    return eve;
  });

  return {
    type: EDIT_EVENT,
    payload: newEvents
  };
};

const fetchAllCalendar = () => {
  return dispatch => {
    dispatch(fetchCalendarAllRequest());

    const success = res => {
      dispatch(fetchCalendarAllSuccess(res.data.data));
    };

    const error = err => {
      dispatch(fetchCalendarAllFailure(err.message));
    };

    http.get('/calendar', success, error);
  };

};

const fetchCalendarById = id => {
  return dispatch => {
    dispatch(fetchCalendarByIdRequest());
    dispatch(clearActiveCalendar());

    const success = res => {
      dispatch(fetchCalendarByIdSuccess(res.data.data));
    };

    const error = err => {
      dispatch(fetchCalendarByIdFailure(err.message));
      dispatch(push('/not-found'));
    };

    http.get(`/calendar/${id}`, success, error);
  };
};

const postCalendar = (calendar, events) => {
  // MANIPULATE HERE

  const eventData = events.map(event => {
    event.start = moment(event.start).format('YYYY-MM-DD');
    event.end = moment(event.end).format('YYYY-MM-DD');

    return event;
  });

  const data = {
    ...calendar,
    events: [...eventData]
  };

  console.log('CALENDAR API DATA :', data);

  return dispatch => {
    dispatch(postCalendarRequest());

    const success = res => {
      dispatch(postCalendarSuccess(res.data.data));
      dispatch(push('/panel/calendars'));
    };

    const error = err => {
      const errCopy = { ...err };
      console.log(errCopy);
      dispatch(postCalendarFailure(err.message));
    };

    http.post('/calendar', data, success, error);
  };
};

const patchCalendar = (calendar, newEvents, deletedList, updatedList) => {
  console.log('calendar', calendar);
  console.log('newEvents', newEvents);
  console.log('deletedList', deletedList);
  return dispatch => {
    dispatch(patchCalendarRequest());

    const success = res => {
      dispatch(patchCalendarSuccess(res.data.data));
    };

    const error = err => {
      dispatch(patchCalendarFailure(err.message));
    };

    // http.patch('/calendar', data, success, error);
  };
};

export const calendarActions = {
  fetchCalendarById,
  fetchAllCalendar,
  postCalendar,
  addDeletedEvent,
  patchCalendar,
  editEvent,
  deleteCalendar,
  clearActiveCalendar
};

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
};

// Active Calendar Reducer
const activeCalendarInitialState = {
  error: '',
  data: {},
  deleted: []
};

const filterEvent = (data = [], deleteId) => {
  return data.filter(event => {
    return event.originalId !== deleteId;
  });
};

const activeCalendarReducer = (state = activeCalendarInitialState, action) => {
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
      };
    case ADD_DELETED_EVENT:
      return {
        ...state,
        data: {
          ...state.data,
          events: filterEvent(state.data.events, action.payload)
        },
        deleted: state.deleted.concat(action.payload)
      };
    case EDIT_EVENT:
      return {
        ...state,
        data: {
          ...state.data,
          events: action.payload
        }
      };
    case CLEAR_ACTIVE_CALENDAR:
      return activeCalendarInitialState;
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
