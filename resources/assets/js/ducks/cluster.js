import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import http from '../services/http';

// Types
const FETCH_CLUSTER_ALL_REQUEST = 'synchrome/cluster/fetch_cluster_request';
const FETCH_CLUSTER_ALL_SUCCESS = 'synchrome/cluster/fetch_cluster_success';
const FETCH_CLUSTER_ALL_FAILURE = 'synchrome/cluster/fetch_cluster_failure';

const FETCH_CLUSTER_BYID_REQUEST = 'synchrome/cluster/fetch_cluster_byid_request';
const FETCH_CLUSTER_BYID_SUCCESS = 'synchrome/cluster/fetch_cluster_byid_success';
const FETCH_CLUSTER_BYID_FAILURE = 'synchrome/cluster/fetch_cluster_byid_failure';

const FETCH_CLUSTER_KEY_REQUEST = 'synchrome/cluster/fetch_cluster_key_request';
const FETCH_CLUSTER_KEY_SUCCESS = 'synchrome/cluster/fetch_cluster_key_success';
const FETCH_CLUSTER_KEY_FAILURE = 'synchrome/cluster/fetch_cluster_key_failure';

const POST_CLUSTER_REQUEST = 'synchrome/cluster/post_cluster_request';
const POST_CLUSTER_SUCCESS = 'synchrome/cluster/post_cluster_success';
const POST_CLUSTER_FAILURE = 'synchrome/cluster/post_cluster_failure';

const PATCH_CLUSTER_REQUEST = 'synchrome/cluster/patch_cluster_request';
const PATCH_CLUSTER_SUCCESS = 'synchrome/cluster/patch_cluster_success';
const PATCH_CLUSTER_FAILURE = 'synchrome/cluster/patch_cluster_failure';

const DELETE_CLUSTER_REQUEST = 'synchrome/cluster/delete_cluster_request';
const DELETE_CLUSTER_SUCCESS = 'synchrome/cluster/delete_cluster_success';
const DELETE_CLUSTER_FAILURE = 'synchrome/cluster/delete_cluster_failure';

const GENERATE_CLUSTER_KEY_REQUEST = 'synchrome/cluster/generate_cluster_key_request';
const GENERATE_CLUSTER_KEY_SUCCESS = 'synchrome/cluster/generate_cluster_key_success';
const GENERATE_CLUSTER_KEY_FAILURE = 'synchrome/cluster/generate_cluster_key_failure';

const DISABLE_CLUSTER_KEY_REQUEST = 'synchrome/cluster/disable_cluster_key_request';
const DISABLE_CLUSTER_KEY_SUCCESS = 'synchrome/cluster/disable_cluster_key_success';
const DISABLE_CLUSTER_KEY_FAILURE = 'synchrome/cluster/disable_cluster_key_failure';


export const clusterTypes = {
  FETCH_CLUSTER_ALL_FAILURE,
  FETCH_CLUSTER_ALL_REQUEST,
  FETCH_CLUSTER_ALL_SUCCESS,
  POST_CLUSTER_REQUEST,
  POST_CLUSTER_SUCCESS,
  POST_CLUSTER_FAILURE,
  DELETE_CLUSTER_REQUEST,
  DELETE_CLUSTER_SUCCESS,
  DELETE_CLUSTER_FAILURE,
  GENERATE_CLUSTER_KEY_FAILURE,
  GENERATE_CLUSTER_KEY_REQUEST,
  GENERATE_CLUSTER_KEY_SUCCESS,
  PATCH_CLUSTER_FAILURE,
  PATCH_CLUSTER_REQUEST,
  PATCH_CLUSTER_SUCCESS,
  FETCH_CLUSTER_KEY_FAILURE,
  FETCH_CLUSTER_KEY_REQUEST,
  FETCH_CLUSTER_KEY_SUCCESS,
  FETCH_CLUSTER_BYID_FAILURE,
  FETCH_CLUSTER_BYID_REQUEST,
  FETCH_CLUSTER_BYID_SUCCESS,
  DISABLE_CLUSTER_KEY_FAILURE,
  DISABLE_CLUSTER_KEY_REQUEST,
  DISABLE_CLUSTER_KEY_SUCCESS
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

const fetchClusterByIdRequest = () => ({
  type: FETCH_CLUSTER_BYID_REQUEST
});

const fetchClusterByIdSuccess = payload => ({
  type: FETCH_CLUSTER_BYID_SUCCESS,
  payload
});

const fetchClusterByIdFailure = payload => ({
  type: FETCH_CLUSTER_BYID_FAILURE,
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

const deleteClusterRequest = () => ({
  type: DELETE_CLUSTER_REQUEST
});

const deleteClusterSuccess = payload => ({
  type: DELETE_CLUSTER_SUCCESS,
  payload
});

const deleteClusterFailure = payload => ({
  type: DELETE_CLUSTER_FAILURE,
  payload
});

const generateClusterKeyRequest = () => ({
  type: GENERATE_CLUSTER_KEY_REQUEST
});

const generateClusterKeySuccess = payload => ({
  type: GENERATE_CLUSTER_KEY_SUCCESS,
  payload
});

const generateClusterKeyFailure = payload => ({
  type: GENERATE_CLUSTER_KEY_FAILURE,
  payload
});

const disableClusterKeyRequest = () => ({
  type: DISABLE_CLUSTER_KEY_REQUEST
});

const disableClusterKeySuccess = () => ({
  type: DISABLE_CLUSTER_KEY_SUCCESS
});

const disableClusterKeyFailure = payload => ({
  type: DISABLE_CLUSTER_KEY_FAILURE,
  payload
});

const patchClusterRequest = () => ({
  type: PATCH_CLUSTER_REQUEST
});

const patchClusterSuccess = payload => ({
  type: PATCH_CLUSTER_SUCCESS,
  payload
});

const patchClusterFailure = payload => ({
  type: PATCH_CLUSTER_FAILURE,
  payload
});

const fetchClusterKeyRequest = () => ({
  type: FETCH_CLUSTER_KEY_REQUEST
});

const fetchClusterKeySuccess = payload => ({
  type: FETCH_CLUSTER_KEY_SUCCESS,
  payload
});

const fetchClusterKeyFailure = payload => ({
  type: FETCH_CLUSTER_KEY_FAILURE,
  payload
});

const disableClusterKey = (keyId, clusterId) => (
  dispatch => {
    dispatch(disableClusterKeyRequest());

    const success = res => {
      console.log(res);
      dispatch(disableClusterKeySuccess());
      dispatch(fetchClusterKey(clusterId));
    };

    const error = err => {
      console.log(err);
      dispatch(disableClusterKeyFailure(err.message));
      dispatch(fetchClusterKey(clusterId));
    };

    http.post(`/cluster/keys/${keyId}/disable`, { id: clusterId }, success, error);
  }
);

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

const fetchClusterById = id => (
  dispatch => {
    dispatch(fetchClusterByIdRequest());

    const success = res => {
      dispatch(fetchClusterByIdSuccess(res.data.data));
    };

    const error = err => {
      dispatch(fetchClusterByIdFailure(err.message));
    };

    http.get(`/cluster/${id}`, success, error);
  }
);

const fetchClusterKey = id => (
  dispatch => {
    dispatch(fetchClusterKeyRequest());

    const success = res => {
      dispatch(fetchClusterKeySuccess(res.data.data));
    };

    const error = err => {
      dispatch(fetchClusterKeyFailure(err.message));
    };

    http.get(`/cluster/${id}/keys`, success, error);
  }
);

const postCluster = data => (
  dispatch => {
    dispatch(reset('clusterForm'));
    dispatch(postClusterRequest());

    const success = res => {
      dispatch(postClusterSuccess(res.data.data));
      dispatch(fetchAllCluster());
    };

    const error = err => {
      dispatch(postClusterFailure(err.message));
    };

    http.post('/cluster', data, success, error);
  }
);

const patchCluster = (id, data) => (
  dispatch => {
    dispatch(patchClusterRequest());

    const success = res => {
      dispatch(patchClusterSuccess(res.data.data));
      dispatch(reset('editClusterForm'));
      dispatch(push('/panel/clusters'));
    };

    const error = err => {
      dispatch(patchClusterFailure(err.message));
    };

    http.patch(`/cluster/${id}`, data, success, error);
  }
);

const deleteCluster = id => (
  dispatch => {
    dispatch(deleteClusterRequest());

    const success = res => {
      dispatch(deleteClusterSuccess(res.data.data));
      dispatch(fetchAllCluster());
    };

    const error = err => {
      dispatch(deleteClusterFailure(err.message));
    };

    http.delete(`/cluster/${id}`, success, error);
  }
);

const generateClusterKey = id => (
  dispatch => {
    dispatch(generateClusterKeyRequest());

    const success = res => {
      dispatch(generateClusterKeySuccess(res.data.data));
      dispatch(fetchClusterKey(id));
    };

    const error = err => {
      dispatch(generateClusterKeyFailure(err.message));
    };

    http.post(`/cluster/${id}/keys`, id, success, error);
  }
)

export const clusterActions = {
  fetchAllCluster,
  postCluster,
  deleteCluster,
  fetchClusterById,
  generateClusterKey,
  patchCluster,
  fetchClusterKey,
  disableClusterKey
};

// Reducer
const initialState = {
  error: '',
  data: [],
  active: {
    keys: []
  }
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
        active: {
          keys: [...state.active.keys],
          ...state.active
        }
      };
    case POST_CLUSTER_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case FETCH_CLUSTER_BYID_SUCCESS:
      return {
        ...state,
        active: {
          keys: [...state.active.keys],
          ...action.payload
        }
      };
    case FETCH_CLUSTER_BYID_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case PATCH_CLUSTER_SUCCESS:
      return {
        ...state,
        active: {
          keys: [...state.active.keys],
          ...action.payload
        }
      };
    case PATCH_CLUSTER_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case FETCH_CLUSTER_KEY_SUCCESS:
      return {
        ...state,
        active: {
          ...state.active,
          keys: action.payload
        }
      };
    case FETCH_CLUSTER_KEY_FAILURE:
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
