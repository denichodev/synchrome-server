import http from '../services/http';

// Types
const FETCH_CLUSTER_ALL_REQUEST = 'synchrome/cluster/fetch_cluster_request';
const FETCH_CLUSTER_ALL_SUCCESS = 'synchrome/cluster/fetch_cluster_success';
const FETCH_CLUSTER_ALL_FAILURE = 'synchrome/cluster/fetch_cluster_failure';

export const clusterTypes = {
  FETCH_CLUSTER_ALL_FAILURE,
  FETCH_CLUSTER_ALL_REQUEST,
  FETCH_CLUSTER_ALL_SUCCESS
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

export const clusterActions = {
  fetchAllCluster
};

// Reducer
const initialState = {
  error: '',
  data: []
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
    default:
      return state;
  }
};

export default {
  initialState,
  clusterReducer
}
