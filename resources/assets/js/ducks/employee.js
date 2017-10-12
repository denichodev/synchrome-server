import { push } from 'react-router-redux';
import http from '../services/http';
import { echelonActions } from './echelon';

// Types
const FETCH_EMPLOYEE_ALL_REQUEST = 'synchrome/employee/fetch_employee_all_request';
const FETCH_EMPLOYEE_ALL_SUCCESS = 'synchrome/employee/fetch_employee_all_success';
const FETCH_EMPLOYEE_ALL_FAILURE = 'synchrome/employee/fetch_employee_all_failure';

const FETCH_EMPLOYEE_BYID_REQUEST = 'synchrome/employee/fetch_employee_byid_request';
const FETCH_EMPLOYEE_BYID_SUCCESS = 'synchrome/employee/fetch_employee_byid_success';
const FETCH_EMPLOYEE_BYID_FAILURE = 'synchrome/employee/fetch_employee_byid_failure';

const FETCH_EMPLOYEE_BYAGENCY_REQUEST = 'synchrome/employee/fetch_employee_byagency_request';
const FETCH_EMPLOYEE_BYAGENCY_SUCCESS = 'synchrome/employee/fetch_employee_byagency_success';
const FETCH_EMPLOYEE_BYAGENCY_FAILURE = 'synchrome/employee/fetch_employee_byagency_failure';

const POST_EMPLOYEE_REQUEST = 'synchrome/employee/post_employee_request';
const POST_EMPLOYEE_SUCCESS = 'synchrome/employee/post_employee_success';
const POST_EMPLOYEE_FAILURE = 'synchrome/employee/post_employee_failure';

const PATCH_EMPLOYEE_REQUEST = 'synchrome/employee/patch_employee_request';
const PATCH_EMPLOYEE_SUCCESS = 'synchrome/employee/patch_employee_success';
const PATCH_EMPLOYEE_FAILURE = 'synchrome/employee/patch_employee_failure';

const DELETE_EMPLOYEE_REQUEST = 'synchrome/employee/delete_employee_request';
const DELETE_EMPLOYEE_SUCCESS = 'synchrome/employee/delete_employee_success';
const DELETE_EMPLOYEE_FAILURE = 'synchrome/employee/delete_employee_failure';

const FETCH_WORKSHIFT_REQUEST = 'synchrome/employee/fetch_workshift_request';
const FETCH_WORKSHIFT_SUCCESS = 'synchrome/employee/fetch_workshift_success';
const FETCH_WORKSHIFT_FAILURE = 'synchrome/employee/fetch_workshift_failure';

const FETCH_RELIGION_REQUEST = 'synchrome/employee/fetch_religion_request';
const FETCH_RELIGION_SUCCESS = 'synchrome/employee/fetch_religion_success';
const FETCH_RELIGION_FAILURE = 'synchrome/employee/fetch_religion_failure';

const FETCH_RANK_REQUEST = 'synchrome/employee/fetch_rank_request';
const FETCH_RANK_SUCCESS = 'synchrome/employee/fetch_rank_success';
const FETCH_RANK_FAILURE = 'synchrome/employee/fetch_rank_failure';

const CLEAR_ACTIVE_EMPLOYEE = 'synchrome/employee/clear_active_employee';
const CLEAR_SELECTED_ECHELON = 'synchrome/employee/clear_selected_echelon';

export const employeeTypes = {
  FETCH_EMPLOYEE_ALL_REQUEST,
  FETCH_EMPLOYEE_ALL_SUCCESS,
  FETCH_EMPLOYEE_ALL_FAILURE,
  FETCH_EMPLOYEE_BYID_REQUEST,
  FETCH_EMPLOYEE_BYID_SUCCESS,
  FETCH_EMPLOYEE_BYID_FAILURE,
  FETCH_EMPLOYEE_BYAGENCY_REQUEST,
  FETCH_EMPLOYEE_BYAGENCY_SUCCESS,
  FETCH_EMPLOYEE_BYAGENCY_FAILURE,
  POST_EMPLOYEE_REQUEST,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  FETCH_WORKSHIFT_FAILURE,
  FETCH_WORKSHIFT_REQUEST,
  FETCH_WORKSHIFT_SUCCESS,
  PATCH_EMPLOYEE_FAILURE,
  PATCH_EMPLOYEE_REQUEST,
  PATCH_EMPLOYEE_SUCCESS,
  CLEAR_ACTIVE_EMPLOYEE,
  CLEAR_SELECTED_ECHELON,
  FETCH_RELIGION_FAILURE,
  FETCH_RELIGION_REQUEST,
  FETCH_RELIGION_SUCCESS,
  FETCH_RANK_REQUEST,
  FETCH_RANK_FAILURE,
  FETCH_RANK_SUCCESS
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

const fetchEmployeeByAgencyRequest = () => ({
  type: FETCH_EMPLOYEE_BYAGENCY_REQUEST
});

const fetchEmployeeByAgencySuccess = (payload) => ({
  type: FETCH_EMPLOYEE_BYAGENCY_SUCCESS,
  payload
});

const fetchEmployeeByAgencyFailure = (error) => ({
  type: FETCH_EMPLOYEE_BYAGENCY_FAILURE,
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

const patchEmployeeRequest = () => ({
  type: PATCH_EMPLOYEE_REQUEST
});

const patchEmployeeSuccess = payload => ({
  type: PATCH_EMPLOYEE_SUCCESS,
  payload
});

const patchEmployeeFailure = payload => ({
  type: PATCH_EMPLOYEE_FAILURE,
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

const fetchReligionRequest = () => ({
  type: FETCH_RELIGION_REQUEST
});

const fetchReligionSuccess = payload => ({
  type: FETCH_RELIGION_SUCCESS,
  payload
});

const fetchReligionFailure = payload => ({
  type: FETCH_RELIGION_FAILURE,
  payload
});

const fetchRankRequest = () => ({
  type: FETCH_RANK_REQUEST
});

const fetchRankSuccess = payload => ({
  type: FETCH_RANK_SUCCESS,
  payload
});

const fetchRankFailure = payload => ({
  type: FETCH_RANK_FAILURE,
  payload
});


const clearSelectedEchelon = () => ({
  type: CLEAR_SELECTED_ECHELON
});

const clearActiveEmployee = () => ({
  type: CLEAR_ACTIVE_EMPLOYEE
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

const fetchAllReligion = () => (
  (dispatch) => {
    dispatch(fetchReligionRequest());

    const success = (res) => {
      dispatch(fetchReligionSuccess(res.data.data));
    };

    const error = (err) => {
      dispatch(fetchReligionFailure(err.message));
    };

    http.get('/religion', success, error);
  }
);

const fetchAllRank = () => (
  (dispatch) => {
    dispatch(fetchRankRequest());

    const success = (res) => {
      dispatch(fetchRankSuccess(res.data.data));
    };

    const error = (err) => {
      dispatch(fetchRankFailure(err.message));
    };

    http.get('employee/ranks', success, error);
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

const fetchEmployeeByAgency = id => (
  dispatch => {
    dispatch(fetchEmployeeByAgencyRequest());

    const success = res => {
      dispatch(fetchEmployeeByAgencySuccess(res.data.data));
    };

    const error = err => {
      dispatch(fetchEmployeeByAgencyFailure(err.message));
    };

    http.get(`/employee?agency_id=${id}`, success, error);
  }
);

const postEmployee = (data) => {
  // MANIPULATE data HERE IF YOU WANT TO
  return (dispatch) => {
    dispatch(postEmployeeRequest());

    const success = res => {
      dispatch(postEmployeeSuccess(res.data.data));
      dispatch(push('/panel/employees'));
    };

    const error = err => {
      dispatch(postEmployeeFailure(err.message));
    };


    http.post('/employee', data, success, error);
  };
};

const patchEmployee = (id, data) => (
  // MANIPULATE data HERE IF YOU WANT TO
  (dispatch) => {
    dispatch(patchEmployeeRequest());

    const success = res => {
      console.log(res);
      dispatch(push('/panel/employees'));
      dispatch(patchEmployeeSuccess(res.data.data));
      dispatch(clearActiveEmployee());
      dispatch(echelonActions.clearActiveEchelon());
    };

    const error = err => {
      dispatch(patchEmployeeFailure(err.message));
    };

    http.patch(`/employee/${id}`, data, success, error);
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
      dispatch(fetchWorkshiftSuccess(res.data.data));
    };

    const error = err => {
      dispatch(fetchWorkshiftFailure(err.message));
    };

    http.get('/employee/workshifts', success, error);
  }
);

export const employeeActions = {
  fetchAllEmployee,
  fetchEmployeeById,
  fetchEmployeeByAgency,
  postEmployee,
  deleteEmployee,
  fetchWorkshift,
  patchEmployee,
  clearActiveEmployee,
  clearSelectedEchelon,
  fetchAllReligion,
  fetchAllRank
};

// Reducer
const initialState = {
  error: '',
  data: [],
  workshifts: [],
  active: {}
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
        active: action.payload
      };
    case POST_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case PATCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        active: action.payload
      };
    case PATCH_EMPLOYEE_FAILURE:
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
    case FETCH_EMPLOYEE_BYID_SUCCESS:
      return {
        ...state,
        active: action.payload
      };
    case FETCH_EMPLOYEE_BYID_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case FETCH_EMPLOYEE_BYAGENCY_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_EMPLOYEE_BYAGENCY_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ACTIVE_EMPLOYEE:
      return {
        ...state,
        active: {}
      };
    case FETCH_RELIGION_SUCCESS:
      return {
        ...state,
        religions: action.payload
      };
    case FETCH_RELIGION_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case FETCH_RANK_SUCCESS:
      return {
        ...state,
        ranks: action.payload
      };
    case FETCH_RANK_FAILURE:
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
