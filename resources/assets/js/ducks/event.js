import http from '../services/http';

// Types
const FETCH_EVENT_CATEGORY_REQUEST = 'synchrome/event/fetch_event_category_request';
const FETCH_EVENT_CATEGORY_SUCCESS = 'synchrome/event/fetch_event_category_success';
const FETCH_EVENT_CATEGORY_FAILURE = 'synchrome/event/fetch_event_category_failure';

const ADD_EVENT_TO_POST = 'synchrome/event/add_events_to_post';

const CALENDAR_DATE_SELECTED = 'synchrome/eventForm/calendar_date_selected';

export const eventTypes = {
  FETCH_EVENT_CATEGORY_REQUEST,
  FETCH_EVENT_CATEGORY_SUCCESS,
  FETCH_EVENT_CATEGORY_FAILURE,
  ADD_EVENT_TO_POST,
  CALENDAR_DATE_SELECTED,  
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
  }
}

const calendarDateSelected = (start, end) => {
  return {
    type: CALENDAR_DATE_SELECTED,
    payload: {
      start,
      end
    }
  };
};

const fetchEventCategory = () => {
  return dispatch => {
    dispatch(fetchEventCategoryRequest());

    const success = res => {
      dispatch(fetchEventCategorySuccess(res.data.data));
    }

    const error = err => {
      dispatch(fetchEventCategoryFailure(err.message));
    }

    http.get('/calendar/event/category', success, error);
  }
}

export const eventActions = {
  fetchEventCategory,
  addEventToPost,
  calendarDateSelected
}

// Reducer
const initialState = {
  error: '',
  category: [],
  toPost: []
}

const reduxFormPlugin = {
  eventForm: (state, action) => {   // <----- 'login' is name of form given to reduxForm()
    switch(action.type) {
      case CALENDAR_DATE_SELECTED:
        return {
          ...state,
          values: {
            ...state.values,
            start: action.payload.start,
            end: action.payload.end// <----- clear password value
          }
        }
      default:
        return state
    }
  }
}

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
      }
    case ADD_EVENT_TO_POST:
      return {
        ...state,
        toPost: state.toPost.concat(action.payload)
      }
    default:
      return state;  
  }
}

export default {
  eventReducer,
  initialState,
  reduxFormPlugin
};
