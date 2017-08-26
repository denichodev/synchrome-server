import http from '../services/http';

// Types
const FETCH_EVENT_CATEGORY_REQUEST = 'synchrome/event/fetch_event_category_request';
const FETCH_EVENT_CATEGORY_SUCCESS = 'synchrome/event/fetch_event_category_success';
const FETCH_EVENT_CATEGORY_FAILURE = 'synchrome/event/fetch_event_category_failure';

export const eventTypes = {
  FETCH_EVENT_CATEGORY_REQUEST,
  FETCH_EVENT_CATEGORY_SUCCESS,
  FETCH_EVENT_CATEGORY_FAILURE
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
  fetchEventCategory
}

// Reducer
const initialState = {
  error: '',
  category: []
}

const eventReducer = (state = {}, action) => {
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
    default:
      return state;  
  }
}

export default {
  eventReducer,
  initialState
};
