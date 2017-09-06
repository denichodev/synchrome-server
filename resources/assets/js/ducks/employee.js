import { push } from 'react-router-redux';
import http from '../services/http';

// Types
const FETCH_EMPLOYEE_ALL_REQUEST = 'synchrome/employee/fetch_employee_all_request';
const FETCH_EMPLOYEE_ALL_SUCCESS = 'synchrome/employee/fetch_employee_all_success';
const FETCH_EMPLOYEE_ALL_FAILURE = 'synchrome/employee/fetch_employee_all_failure';

const FETCH_EMPLOYEE_BYID_REQUEST = 'synchrome/employee/fetch_employee_byid_request';
const FETCH_EMPLOYEE_BYID_SUCCESS = 'synchrome/employee/fetch_employee_byid_success';
const FETCH_EMPLOYEE_BYID_FAILURE = 'synchrome/employee/fetch_employee_byid_failure';

const POST_EMPLOYEE_REQUEST = 'synchrome/employee/post_employee_request';
const POST_EMPLOYEE_SUCCESS = 'synchrome/employee/post_employee_success';
const POST_EMPLOYEE_FAILURE = 'synchrome/employee/post_employee_failure';

const DELETE_EMPLOYEE_REQUEST = 'synchrome/employee/delete_employee_request';
const DELETE_EMPLOYEE_SUCCESS = 'synchrome/employee/delete_employee_success';
const DELETE_EMPLOYEE_FAILURE = 'synchrome/employee/delete_employee_failure';

const FETCH_WORKSHIFT_REQUEST = 'synchrome/employee/fetch_workshift_request';
const FETCH_WORKSHIFT_SUCCESS = 'synchrome/employee/fetch_workshift_success';
const FETCH_WORKSHIFT_FAILURE = 'synchrome/employee/fetch_workshift_failure';


export const employeeTypes = {
  FETCH_EMPLOYEE_ALL_REQUEST,
  FETCH_EMPLOYEE_ALL_SUCCESS,
  FETCH_EMPLOYEE_ALL_FAILURE,
  FETCH_EMPLOYEE_BYID_REQUEST,
  FETCH_EMPLOYEE_BYID_SUCCESS,
  FETCH_EMPLOYEE_BYID_FAILURE,
  POST_EMPLOYEE_REQUEST,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  FETCH_WORKSHIFT_FAILURE,
  FETCH_WORKSHIFT_REQUEST,
  FETCH_WORKSHIFT_SUCCESS
};

// Action Creators
const fetchEmployeeAllRequest = () => ({
  type: FETCH_EMPLOYEE_ALL_REQUEST
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

const deleteEmployeeRequest = () => ({
  type: DELETE_EMPLOYEE_REQUEST
});

const deleteEmployeeSuccess = payload => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload
});

const deleteEmployeeFailure = payload => ({
  type: DELETE_EMPLOYEE_FAILURE,
  payload
});

const fetchWorkshiftRequest = () => ({
  type: FETCH_WORKSHIFT_REQUEST
});

const fetchWorkshiftSuccess = payload => ({
  type: FETCH_WORKSHIFT_SUCCESS,
  payload
});

const fetchWorkshiftFailure = payload => ({
  type: FETCH_WORKSHIFT_FAILURE,
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

const deleteEmployee = id => (
  dispatch => {
    dispatch(deleteEmployeeRequest());

    const success = res => {
      dispatch(deleteEmployeeSuccess(res.data.data));
      dispatch(fetchAllEmployee());
    };

    const error = err => {
      dispatch(deleteEmployeeFailure(err.message));
    };

    http.delete(`/employee/${id}`, success, error);
  }
);

const fetchWorkshift = () => (
  dispatch => {
    dispatch(fetchWorkshiftRequest());

    const success = res => {
      console.log(res);
      dispatch(fetchWorkshiftSuccess(res.data.data));
    };

    const error = err => {
      console.log(err);
      dispatch(fetchWorkshiftFailure(err.message));
    };

    http.get('/employee/workshifts', success, error);
  }
);

export const employeeActions = {
  fetchAllEmployee,
  fetchEmployeeById,
  postEmployee,
  deleteEmployee,
  fetchWorkshift
};

// Reducer
const initialState = {
  error: '',
  data: [],
  workshifts: []
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
    case DELETE_EMPLOYEE_SUCCESS:
      return state;
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case FETCH_WORKSHIFT_SUCCESS:
      return {
        ...state,
        workshifts: action.payload
      };
    case FETCH_WORKSHIFT_FAILURE:
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
