import { push } from 'react-router-redux';
import http from '../services/http';

// Types
const FETCH_EMPLOYEE_ALL_REQUEST = 'synchrome/employee/fetch_calendar_all_request';
const FETCH_EMPLOYEE_ALL_SUCCESS = 'synchrome/employee/fetch_calendar_all_success';
const FETCH_EMPLOYEE_ALL_FAILURE = 'synchrome/employee/fetch_calendar_all_failure';

const FETCH_EMPLOYEE_BYID_REQUEST = 'synchrome/employee/fetch_calendar_byid_request';
const FETCH_EMPLOYEE_BYID_SUCCESS = 'synchrome/employee/fetch_calendar_byid_success';
const FETCH_EMPLOYEE_BYID_FAILURE = 'synchrome/employee/fetch_calendar_byid_failure';

const POST_EMPLOYEE_REQUEST = 'synchrome/employee/post_employee_request';
const POST_EMPLOYEE_SUCCESS = 'synchrome/employee/post_employee_success';
const POST_EMPLOYEE_FAILURE = 'synchrome/employee/post_employee_failure';

export const employeeTypes = {
  FETCH_EMPLOYEE_ALL_REQUEST,
  FETCH_EMPLOYEE_ALL_SUCCESS,
  FETCH_EMPLOYEE_ALL_FAILURE,
  FETCH_EMPLOYEE_BYID_REQUEST,
  FETCH_EMPLOYEE_BYID_SUCCESS,
  FETCH_EMPLOYEE_BYID_FAILURE,
  POST_EMPLOYEE_REQUEST,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_FAILURE
};

// Action Creators
const fetchEmployeeAllRequest = () => ({
  type: FETCH_EMPLOYEE_ALL_SUCCESS
});

const fetchEmployeeAllSuccess = (payload) => ({
  type: FETCH_EMPLOYEE_ALL_SUCCESS,
  payload
});

const fetchEmployeeAllFailure = (error) => ({
  type: FETCH_EMPLOYEE_ALL_FAILURE,
  error
});

const fetchEmployeeByIdRequest = () => ({
  type: FETCH_EMPLOYEE_BYID_REQUEST
});

const fetchEmployeeByIdSuccess = (payload) => ({
  type: FETCH_EMPLOYEE_BYID_SUCCESS,
  payload
});

const fetchEmployeeByIdFailure = (error) => ({
  type: FETCH_EMPLOYEE_BYID_FAILURE,
  error
});

const postEmployeeRequest = () => ({
  type: POST_EMPLOYEE_REQUEST
});

const postEmployeeSuccess = payload => ({
  type: POST_EMPLOYEE_SUCCESS,
  payload
});

const postEmployeeFailure = payload => ({
  type: POST_EMPLOYEE_FAILURE,
  payload
});

const fetchAllEmployee = () => (
  (dispatch) => {
    dispatch(fetchEmployeeAllRequest());

    const success = (res) => {
      dispatch(fetchEmployeeAllSuccess(res.data.data));
    };

    const error = (err) => {
      dispatch(fetchEmployeeAllFailure(err.message));
    };

    http.get('/employee', success, error);
  }
);

const fetchEmployeeById = (id) => (
  (dispatch) => {
    dispatch(fetchEmployeeByIdRequest());

    const success = (res) => {
      dispatch(fetchEmployeeByIdSuccess(res.data.data));
    };

    const error = (err) => {
      dispatch(fetchEmployeeByIdFailure(err.message));
    };

    http.get(`/employee/${id}`, success, error);
  }
);

const postEmployee = (data) => (
  // MANIPULATE data HERE IF YOU WANT TO
  (dispatch) => {
    dispatch(postEmployeeRequest());

    const success = res => {
      dispatch(postEmployeeSuccess(res.data.data));
      dispatch(push('/panel/employees'));
    };

    const error = err => {
      dispatch(postEmployeeFailure(err.message));
    };

    http.post('/employee', data, success, error);
  }
);

export const employeeActions = {
  fetchAllEmployee,
  fetchEmployeeById,
  postEmployee
};

// Reducer
const initialState = {
  error: '',
  data: []
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_EMPLOYEE_ALL_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case POST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employee: action.payload
      };
    case POST_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default {
  initialState,
  employeeReducer
};
