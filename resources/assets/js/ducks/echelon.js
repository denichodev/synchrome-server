import http from '../services/http';

// Types
const FETCH_ECHELON_BYID_REQUEST = 'synchrome/echelon/fetch_echelon_byid_request';
const FETCH_ECHELON_BYID_SUCCESS = 'synchrome/echelon/fetch_echelon_byid_success';
const FETCH_ECHELON_BYID_FAILURE = 'synchrome/echelon/fetch_echelon_byid_failure';

const CLEAR_ACTIVE_ECHELON = 'synchrome/echelon/clear_active_echelon';

export const echelonTypes = {
  FETCH_ECHELON_BYID_REQUEST,
  FETCH_ECHELON_BYID_SUCCESS,
  FETCH_ECHELON_BYID_FAILURE,
  CLEAR_ACTIVE_ECHELON
};

const fetchEchelonByIdRequest = () => {
  return {
    type: FETCH_ECHELON_BYID_REQUEST
  };
};

const fetchEchelonByIdSuccess = payload => {
  return {
    type: FETCH_ECHELON_BYID_SUCCESS,
    payload
  };
};

const fetchEchelonByIdFailure = payload => {
  return {
    type: FETCH_ECHELON_BYID_FAILURE,
    payload
  };
};

const clearActiveEchelon = () => ({
  type: CLEAR_ACTIVE_ECHELON
});

const fetchEchelonsById = agencyId => {
  return dispatch => {
    dispatch(fetchEchelonByIdRequest());

    const success = res => {
      dispatch(fetchEchelonByIdSuccess(res.data.data));
    };

    const error = err => {
      dispatch(fetchEchelonByIdFailure(err.message));
    };

    http.get(`/agency/${agencyId}/echelons`, success, error);
  };
};

export const echelonActions = {
  fetchEchelonsById,
  clearActiveEchelon
};

// Reducer
const initialState = {
  error: '',
  data: []
}

const echelonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ECHELON_BYID_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_ECHELON_BYID_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ACTIVE_ECHELON:
      return initialState;
    default:
      return state;
  }
};

export default {
  echelonReducer,
  initialState
};
