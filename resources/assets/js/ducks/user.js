import { push } from 'react-router-redux';
import http from '../services/http';

const GET_USER_ALL_REQUEST = 'synchrome/user/get_user_all_request';
const GET_USER_ALL_SUCCESS = 'synchrome/user/get_user_all_success';
const GET_USER_ALL_FAILURE = 'synchrome/user/get_user_all_failure';

const GET_USER_BYID_REQUEST = 'synchrome/user/get_user_byid_request';
const GET_USER_BYID_SUCCESS = 'synchrome/user/get_user_byid_success';
const GET_USER_BYID_FAILURE = 'synchrome/user/get_user_byid_failure';

const GET_ROLE_REQUEST = 'synchrome/user/get_role_request';
const GET_ROLE_SUCCESS = 'synchrome/user/get_role_success';
const GET_ROLE_FAILURE = 'synchrome/user/get_role_failure';

const POST_USER_REQUEST = 'synchrome/user/post_user_request';
const POST_USER_SUCCESS = 'synchrome/user/post_user_success';
const POST_USER_FAILURE = 'synchrome/user/post_user_failure';

const UPDATE_USER_REQUEST = 'synchrome/user/update_user_request';
const UPDATE_USER_SUCCESS = 'synchrome/user/update_user_success';
const UPDATE_USER_FAILURE = 'synchrome/user/update_user_failure';

const DELETE_USER_REQUEST = 'synchrome/user/delete_user_request';
const DELETE_USER_SUCCESS = 'synchrome/user/delete_user_success';
const DELETE_USER_FAILURE = 'synchrome/user/delete_user_failure';

const CLEAR_ACTIVE_USER = 'synchrome/user/clear_active_user';

export const userTypes = {
  GET_ROLE_FAILURE,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
  POST_USER_FAILURE,
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
  GET_USER_BYID_FAILURE,
  GET_USER_BYID_SUCCESS,
  GET_USER_BYID_REQUEST,
  GET_USER_ALL_FAILURE,
  GET_USER_ALL_REQUEST,
  GET_USER_ALL_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  CLEAR_ACTIVE_USER,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
};

const getRoleRequest = () => ({
  type: GET_ROLE_REQUEST
});

const getRoleFailure = payload => ({
  type: GET_ROLE_FAILURE,
  payload
});

const getRoleSuccess = payload => ({
  type: GET_ROLE_SUCCESS,
  payload
});

const getUserAllRequest = () => ({
  type: GET_USER_ALL_REQUEST
});

const getUserAllFailure = payload => ({
  type: GET_USER_ALL_FAILURE,
  payload
});

const getUserAllSuccess = payload => ({
  type: GET_USER_ALL_SUCCESS,
  payload
});

const getUserByIdRequest = () => ({
  type: GET_USER_BYID_REQUEST
});

const getUserByIdFailure = payload => ({
  type: GET_USER_BYID_FAILURE,
  payload
});

const getUserByIdSuccess = payload => ({
  type: GET_USER_BYID_SUCCESS,
  payload
});

const postUserRequest = () => ({
  type: POST_USER_REQUEST
});

const postUserFailure = payload => ({
  type: POST_USER_FAILURE,
  payload
});

const postUserSuccess = payload => ({
  type: POST_USER_SUCCESS,
  payload
});

const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST
});

const updateUserFailure = payload => ({
  type: UPDATE_USER_FAILURE,
  payload
});

const updateUserSuccess = payload => ({
  type: UPDATE_USER_SUCCESS,
  payload
});

const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST
});

const deleteUserFailure = payload => ({
  type: DELETE_USER_FAILURE,
  payload
});

const deleteUserSuccess = payload => ({
  type: DELETE_USER_SUCCESS,
  payload
});

const clearActiveUser = () => ({
  type: CLEAR_ACTIVE_USER,
  payload: []
});

const getRole = () => (
  dispatch => {
    dispatch(getRoleRequest());

    const success = res => {
      dispatch(getRoleSuccess(res.data.data));
    };

    const error = err => {
      dispatch(getRoleFailure(err.message));
    };

    http.get('/user/roles', success, error);
  }
);

const getAllUser = () => (
  dispatch => {
    dispatch(getUserAllRequest());

    const success = res => {
      dispatch(getUserAllSuccess(res.data.data));
    };

    const error = err => {
      dispatch(getUserAllFailure(err.message));
    };

    http.get('/user', success, error);
  }
);

const getUserById = id => (
  dispatch => {
    dispatch(clearActiveUser());
    dispatch(getUserByIdRequest());

    const success = res => {
      dispatch(getUserByIdSuccess(res.data.data));
    };

    const error = err => {
      dispatch(getUserByIdFailure(err.message));
    };

    http.get(`/user/${id}`, success, error);
  }
);

const postUser = data => (
  dispatch => {
    dispatch(postUserRequest());

    const success = res => {
      dispatch(postUserSuccess(res.data.data));
      dispatch(push('/panel/users'));
    };

    const error = err => {
      dispatch(postUserFailure(err.message));
    };

    http.post('/user', data, success, error);
  }
);

const updateUser = (id, data) => (
  dispatch => {
    dispatch(updateUserRequest());

    const success = res => {
      dispatch(updateUserSuccess(res.data.data));
      dispatch(push('/panel/users'));
    };

    const error = err => {
      dispatch(updateUserFailure(err.message));
    };

    http.patch(`/user/${id}`, data, success, error);
  }
);

const deleteUser = id => (
  dispatch => {
    dispatch(deleteUserRequest());

    const success = res => {
      dispatch(deleteUserSuccess(res.data.data));
      dispatch(getAllUser());
    };

    const error = err => {
      dispatch(deleteUserFailure(err.message));
    };

    http.delete(`/user/${id}`, success, error);
  }
);

export const userActions = {
  postUser,
  getAllUser,
  getUserById,
  getRole,
  deleteUser,
  updateUser
};

const initialState = {
  error: '',
  role: [],
  data: [],
  active: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLE_SUCCESS:
      return {
        ...state,
        role: action.payload
      };
    case GET_ROLE_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case GET_USER_BYID_SUCCESS:
      return {
        ...state,
        active: action.payload
      };
    case GET_USER_BYID_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case GET_USER_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case GET_USER_ALL_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case POST_USER_SUCCESS:
      return {
        ...state,
        active: action.payload
      };
    case POST_USER_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        active: action.payload
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ACTIVE_USER:
      return {
        ...state,
        active: action.payload
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        active: action.payload
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default {
  userReducer,
  initialState
};
