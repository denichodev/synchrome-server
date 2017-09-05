import moment from 'moment';
import http from '../services/http';

// Types
const FETCH_EVENT_CATEGORY_REQUEST = 'synchrome/event/fetch_event_category_request';
const FETCH_EVENT_CATEGORY_SUCCESS = 'synchrome/event/fetch_event_category_success';
const FETCH_EVENT_CATEGORY_FAILURE = 'synchrome/event/fetch_event_category_failure';

const ADD_EVENT_TO_POST = 'synchrome/event/add_event_to_post';
const EDIT_EVENT_TO_POST = 'synchrome/event/edit_event_to_post';
const REMOVE_EVENT_TO_POST = 'synchrome/event/remove_event_to_post';

const CALENDAR_DATE_SELECTED = 'synchrome/event/calendar_date_selected';
const SET_EDIT_STATUS = 'synchrome/event/set_edit_status';
const CLEAR_ACTIVE_EVENT_LIST = 'synchrome/event/clear_active_event_list';

export const eventTypes = {
  FETCH_EVENT_CATEGORY_REQUEST,
  FETCH_EVENT_CATEGORY_SUCCESS,
  FETCH_EVENT_CATEGORY_FAILURE,
  ADD_EVENT_TO_POST,
  CALENDAR_DATE_SELECTED,
  SET_EDIT_STATUS,
  CLEAR_ACTIVE_EVENT_LIST
};

// Action Creators
const fetchEventCategoryRequest = () => {
  return {
    type: FETCH_EVENT_CATEGORY_REQUEST
  };
};

const fetchEventCategorySuccess = payload => {
  return {
    type: FETCH_EVENT_CATEGORY_SUCCESS,
    payload
  };
};

const fetchEventCategoryFailure = payload => {
  return {
    type: FETCH_EVENT_CATEGORY_FAILURE,
    payload
  }
}

const addEventToPost = payload => {
  return {
    type: ADD_EVENT_TO_POST,
    payload
  };
};

const removeEventToPost = payload => {
  return {
    type: REMOVE_EVENT_TO_POST,
    payload
  };
};

const calendarDateSelected = (start, end) => {
  return {
    type: CALENDAR_DATE_SELECTED,
    payload: {
      start,
      end
    }
  };
};

const setEditStatus = payload => {
  return {
    type: SET_EDIT_STATUS,
    payload
  };
};

const editEventToPost = payload => {
  return {
    type: EDIT_EVENT_TO_POST,
    payload
  };
};
const clarActiveEvents = () => ({
  type: CLEAR_ACTIVE_EVENT_LIST
});

const fetchEventCategory = () => {
  return dispatch => {
    dispatch(fetchEventCategoryRequest());

    const success = res => {
      dispatch(fetchEventCategorySuccess(res.data.data));
    };

    const error = err => {
      dispatch(fetchEventCategoryFailure(err.message));
    };

    http.get('/calendar/event/category', success, error);
  };
};

const editEvent = (events, editedEvent) => {
  const copy = events;
  const newEvents = copy.map(eve => {
    if (eve.id === editedEvent.id) {
      return {
        ...eve,
        title: editedEvent.title,
        start: editedEvent.start,
        end: moment(editedEvent.end).format('YYYY-MM-DD')
      };
    }

    return eve;
  });

  return dispatch => {
    dispatch(editEventToPost(newEvents));
  }
};

export const eventActions = {
  fetchEventCategory,
  addEventToPost,
  calendarDateSelected,
  removeEventToPost,
  setEditStatus,
  editEvent,
  clarActiveEvents
};

// Reducer
const initialState = {
  error: '',
  category: [],
  toPost: [],
  isEditing: {
    bool: false
  }
};

const reduxFormPlugin = {
  eventForm: (state, action) => {
    switch (action.type) {
      case CALENDAR_DATE_SELECTED:
        return {
          ...state,
          values: {
            ...state.values,
            start: action.payload.start,
            end: action.payload.end
          }
        };
      case ADD_EVENT_TO_POST:
        return undefined;
      default:
        return state;
    }
  }
};

const filterEvent = (data = [], deleteId) => {
  return data.filter(event => {
    return event.id !== deleteId;
  });
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload
      };
    case FETCH_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case ADD_EVENT_TO_POST:
      return {
        ...state,
        toPost: state.toPost.concat(action.payload)
      };
    case REMOVE_EVENT_TO_POST:
      return {
        ...state,
        toPost: filterEvent(state.toPost, action.payload)
      };
    case SET_EDIT_STATUS:
      return {
        ...state,
        isEditing: action.payload
      };
    case EDIT_EVENT_TO_POST:
      return {
        ...state,
        toPost: action.payload
      };
    case CLEAR_ACTIVE_EVENT_LIST:
      return initialState;
    default:
      return state;
  };
};

export default {
  eventReducer,
  initialState,
  reduxFormPlugin
};
