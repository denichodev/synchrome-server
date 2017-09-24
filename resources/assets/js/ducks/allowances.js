import { push } from 'react-router-redux';
import _ from 'lodash';
import http from '../services/http';

const POST_ALLOWANCES_REQUEST = 'synchrome/allowances/post_allowances_request';
const POST_ALLOWANCES_SUCCESS = 'synchrome/allowances/post_allowances_success';
const POST_ALLOWANCES_FAILURE = 'synchrome/allowances/post_allowances_failure';

const UPDATE_ALLOWANCES_REQUEST =
  'synchrome/allowances/update_allowances_request';
const UPDATE_ALLOWANCES_SUCCESS =
  'synchrome/allowances/update_allowances_success';
const UPDATE_ALLOWANCES_FAILURE =
  'synchrome/allowances/update_allowances_failure';

const FETCH_ALLOWANCES_REQUEST =
  'synchrome/allowances/fetch_allowances_request';
const FETCH_ALLOWANCES_SUCCESS =
  'synchrome/allowances/fetch_allowances_success';
const FETCH_ALLOWANCES_FAILURE =
  'synchrome/allowances/fetch_allowances_failure';

const DELETE_ALLOWANCES_REQUEST =
  'synchrome/allowances/delete_allowances_request';
const DELETE_ALLOWANCES_SUCCESS =
  'synchrome/allowances/delete_allowances_success';
const DELETE_ALLOWANCES_FAILURE =
  'synchrome/allowances/delete_allowances_failure';

const SET_ACTIVE_ALLOWANCE = 'synchrome/allowances/set_active_allowance';

export const allowancesTypes = {
  POST_ALLOWANCES_FAILURE,
  POST_ALLOWANCES_REQUEST,
  POST_ALLOWANCES_SUCCESS,
  FETCH_ALLOWANCES_FAILURE,
  FETCH_ALLOWANCES_REQUEST,
  FETCH_ALLOWANCES_SUCCESS,
  DELETE_ALLOWANCES_REQUEST,
  DELETE_ALLOWANCES_SUCCESS,
  DELETE_ALLOWANCES_FAILURE,
  UPDATE_ALLOWANCES_REQUEST,
  UPDATE_ALLOWANCES_SUCCESS,
  UPDATE_ALLOWANCES_FAILURE,
  SET_ACTIVE_ALLOWANCE
};

const fetchAllowancesRequest = () => ({
  type: FETCH_ALLOWANCES_REQUEST
});

const fetchAllowancesFailure = payload => ({
  type: FETCH_ALLOWANCES_FAILURE,
  payload
});

const fetchAllowancesSuccess = payload => ({
  type: FETCH_ALLOWANCES_SUCCESS,
  payload
});

const postAllowancesRequest = () => ({
  type: POST_ALLOWANCES_REQUEST
});

const postAllowancesFailure = payload => ({
  type: POST_ALLOWANCES_FAILURE,
  payload
});

const postAllowancesSuccess = payload => ({
  type: POST_ALLOWANCES_SUCCESS,
  payload
});

const updateAllowancesRequest = () => ({
  type: UPDATE_ALLOWANCES_REQUEST
});

const updateAllowancesFailure = payload => ({
  type: UPDATE_ALLOWANCES_FAILURE,
  payload
});

const updateAllowancesSuccess = payload => ({
  type: UPDATE_ALLOWANCES_SUCCESS,
  payload
});

const deleteAllowancesRequest = () => ({
  type: DELETE_ALLOWANCES_REQUEST
});

const deleteAllowancesFailure = payload => ({
  type: DELETE_ALLOWANCES_FAILURE,
  payload
});

const deleteAllowancesSuccess = payload => ({
  type: DELETE_ALLOWANCES_SUCCESS,
  payload
});

const postAllowances = data => dispatch => {
  dispatch(postAllowancesRequest());

  const success = res => {
    dispatch(postAllowancesSuccess(res.data.data));
    dispatch(fetchAllowances());
  };

  const error = err => {
    dispatch(postAllowancesFailure(err.message));
  };

  http.post('/allowance', data, success, error);
};

const updateAllowances = (id, data) => dispatch => {
  dispatch(updateAllowancesRequest());

  const success = res => {
    dispatch(updateAllowancesSuccess(res.data.data));
    dispatch(push('/panel/allowances'));
  };

  const error = err => {
    console.log('Errror in updating allowances', err);
    dispatch(updateAllowancesFailure(err.message));
  };

  http.patch(`/allowance/${id}`, data, success, error);
};

const fetchAllowances = () => dispatch => {
  dispatch(fetchAllowancesRequest());

  const success = res => {
    dispatch(fetchAllowancesSuccess(res.data.data));
  };

  const error = err => {
    dispatch(fetchAllowancesFailure(err.message));
  };

  http.get('/allowance', success, error);
};

const deleteAllowances = id => dispatch => {
  dispatch(deleteAllowancesRequest());

  const success = res => {
    dispatch(deleteAllowancesSuccess(res.data.data));
    dispatch(fetchAllowances());
  };

  const error = err => {
    dispatch(deleteAllowancesFailure(err.message));
  };

  http.delete(`/allowance/${id}`, success, error);
};

const setActiveAllowance = id => ({
  type: SET_ACTIVE_ALLOWANCE,
  payload: id
});

export const allowancesActions = {
  fetchAllowances,
  postAllowances,
  deleteAllowances,
  updateAllowances,
  setActiveAllowance
};

const initialState = {
  error: '',
  data: [],
  active: {}
};

const allowancesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALLOWANCES_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_ALLOWANCES_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case POST_ALLOWANCES_SUCCESS:
      return {
        ...state,
        active: action.payload
      };
    case POST_ALLOWANCES_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case SET_ACTIVE_ALLOWANCE:
      return {
        ...state,
        active: _.find(state.data, { id: action.payload })
      };
    default:
      return state;
  }
};

export default {
  initialState,
  allowancesReducer
};
