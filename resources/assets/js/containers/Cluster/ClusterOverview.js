import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import matchSorter from 'match-sorter';
import { Link } from 'react-router-dom';
import { clusterActions } from '../../ducks/cluster';
import { FormText } from '../../components/Forms';
import { FilterableTable, ActionCell } from '../../components/DataTable';

class ClusterOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          Header: 'ID',
          id: 'id',
          accessor: d => d.id,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ['id'] }),
          filterAll: true
        },
        {
          Header: 'Name',
          id: 'name',
          accessor: d => d.name,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ['name'] }),
          filterAll: true
        },
        {
          Header: 'Actions',
          route: 'clusters',
          handleDelete: this.deleteCluster,
          Cell: ActionCell,
          filterable: false
        }
      ]
    };
  }

  componentDidMount() {
    const { fetchAllCluster } = this.props;

    fetchAllCluster();
  }

  onSubmit = values => {
    const { postCluster } = this.props;

    postCluster(values);
  };

  deleteCluster = id => {
    const { deleteCluster } = this.props;
    deleteCluster(id);
  };

  renderClusterTableBody = () => {
    const { clusters } = this.props;

    if (clusters.length <= 0) {
      return (
        <tr>
          <td colSpan="5">
            <center>No cluster added yet</center>
          </td>
        </tr>
      );
    }

    return clusters.map(cluster => (
      <tr key={cluster.id}>
        <td>{cluster.id}</td>
        <td>{cluster.name}</td>
        <td>
          <Link
            to={`/panel/clusters/${cluster.id}`}
            className="btn btn-primary btn-xs"
          >
            Edit
          </Link>&nbsp;
          <button
            data-id={cluster.id}
            type="button"
            className="btn btn-danger btn-xs"
            onClick={() => this.deleteCluster(cluster.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  renderClusterForm = () => {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="name"
          label="Cluster Name"
          placeholder="Cluster 1"
          component={FormText}
        />
        <button className="btn btn-primary pull-right" type="submit">
          Add New Cluster
        </button>
      </form>
    );
  };

  render() {
    const { clusters } = this.props;

    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Clusters</h3>
        </div>
        <div className="box-body">
          <div className="col-md-4">{this.renderClusterForm()}</div>
          <div className="col-md-8 clear-padding">
            <FilterableTable data={clusters} columns={this.state.columns} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clusters: state.cluster.data
});

const mapDispatchToProps = dispatch => ({
  fetchAllCluster: () => dispatch(clusterActions.fetchAllCluster()),
  postCluster: data => dispatch(clusterActions.postCluster(data)),
  deleteCluster: id => dispatch(clusterActions.deleteCluster(id))
});

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  return errors;
};

const formOptions = {
  form: 'clusterForm',
  validate
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(
  ClusterOverview
);

export default reduxForm(formOptions)(connectedComponent);
