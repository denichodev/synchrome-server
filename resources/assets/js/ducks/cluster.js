import http from '../services/http';
import { reset } from 'redux-form';

// Types
const FETCH_CLUSTER_ALL_REQUEST = 'synchrome/cluster/fetch_cluster_request';
const FETCH_CLUSTER_ALL_SUCCESS = 'synchrome/cluster/fetch_cluster_success';
const FETCH_CLUSTER_ALL_FAILURE = 'synchrome/cluster/fetch_cluster_failure';

const POST_CLUSTER_REQUEST = 'synchrome/cluster/post_cluster_request';
const POST_CLUSTER_SUCCESS = 'synchrome/cluster/post_cluster_success';
const POST_CLUSTER_FAILURE = 'synchrome/cluster/post_cluster_failure';

export const clusterTypes = {
  FETCH_CLUSTER_ALL_FAILURE,
  FETCH_CLUSTER_ALL_REQUEST,
  FETCH_CLUSTER_ALL_SUCCESS,
  POST_CLUSTER_REQUEST,
  POST_CLUSTER_SUCCESS,
  POST_CLUSTER_FAILURE
};

// Action Creators
const fetchClusterAllRequest = () => ({
  type: FETCH_CLUSTER_ALL_REQUEST
});

const fetchClusterAllSuccess = payload => ({
  type: FETCH_CLUSTER_ALL_SUCCESS,
  payload
});

const fetchClusterAllFailure = payload => ({
  type: FETCH_CLUSTER_ALL_FAILURE,
  payload
});

const postClusterRequest = () => ({
  type: POST_CLUSTER_REQUEST
});

const postClusterSuccess = payload => ({
  type: POST_CLUSTER_SUCCESS,
  payload
});

const postClusterFailure = payload => ({
  type: POST_CLUSTER_FAILURE,
  payload
});

const fetchAllCluster = () => (
  dispatch => {
    dispatch(fetchClusterAllRequest());

    const success = res => {
      dispatch(fetchClusterAllSuccess(res.data.data));
    };

    const error = err => {
      dispatch(fetchClusterAllFailure(err.message));
    };

    http.get('/cluster', success, error);
  }
);

const postCluster = data => (
  dispatch => {
    dispatch(reset('clusterForm'));
    dispatch(postClusterRequest());

    const success = res => {
      console.log(res);
      dispatch(postClusterSuccess(res.data.data));
      dispatch(fetchAllCluster());
    };

    const error = err => {
      console.log(err);
      dispatch(postClusterFailure(err.message));
    };

    http.post('/cluster', data, success, error);
  }
);

export const clusterActions = {
  fetchAllCluster,
  postCluster
};

// Reducer
const initialState = {
  error: '',
  data: [],
  active: {}
};

const clusterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLUSTER_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_CLUSTER_ALL_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case POST_CLUSTER_SUCCESS:
      return {
        ...state,
        active: action.payload
      };
    case POST_CLUSTER_FAILURE:
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
  clusterReducer
};
