import http from '../services/http';
import { push } from 'react-router-redux';

// Types
const POST_EMPLOYEE_REQUEST = 'synchrome/employee/post_employee_request';
const POST_EMPLOYEE_SUCCESS = 'synchrome/employee/post_employee_success';
const POST_EMPLOYEE_FAILURE = 'synchrome/employee/post_employee_failure';

export const employeeTypes = {
  POST_EMPLOYEE_REQUEST,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_FAILURE
};

// Action Creators
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

const postEmployee = (data) => {
  // MANIPULATE data HERE IF YOU WANT TO
  return dispatch => {
    dispatch(postEmployeeRequest());

    const success = res => {
      dispatch(postEmployeeSuccess(res.data.data));
      dispatch(push('/panel/employees'));
    }

    const error = err => {
      dispatch(postEmployeeFailure(err.message));
    }

    http.post('/employee', data, success, error);
  };
};

export const employeeActions = {
  postEmployee
};

// Reducer
const initialState = {
  error: '',
  employee: {}
}

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
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
  };
};

export default {
  initialState,
  employeeReducer
};
