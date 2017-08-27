import http from '../services/http';

// Types
const FETCH_AGENCY_REQUEST = 'synchrome/agency/fetch_agency_request';
const FETCH_AGENCY_SUCCESS = 'synchrome/agency/fetch_agency_success';
const FETCH_AGENCY_FAILURE = 'synchrome/agency/fetch_agency_failure';

export const agencyTypes = {
  FETCH_AGENCY_REQUEST,
  FETCH_AGENCY_SUCCESS,
  FETCH_AGENCY_FAILURE
};

// Action Creators
const fetchAgencyRequest = () => {
  return {
    type: FETCH_AGENCY_REQUEST
  };
};

const fetchAgencySuccess = payload => {
  return {
    type: FETCH_AGENCY_SUCCESS,
    payload
  };
};

const fetchAgencyFailure = payload => {
  return {
    type: FETCH_AGENCY_FAILURE,
    payload
  };
};

const fetchAllAgency = () => {
  return dispatch => {
    dispatch(fetchAgencyRequest());

    const success = res => {
      dispatch(fetchAgencySuccess(res.data.data));
    }

    const error = err => {
      dispatch(fetchAgencyFailure(err.message));
    }

    http.get('/agency', success, error);
  };
};

export const agencyActions = {
  fetchAllAgency
};

// Reducer
const initialState = {
  error: '',
  data: []
}

const agencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AGENCY_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_AGENCY_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;  
  }
}

export default {
  agencyReducer,
  initialState
}
