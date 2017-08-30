import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ClusterForm from './ClusterForm';
import { clusterActions } from '../../ducks/cluster';

class ClusterOverview extends Component {
  componentDidMount() {
    const { fetchAllCluster } = this.props;

    fetchAllCluster();
  }

  renderClusterTableBody = () => {
    const { clusters } = this.props;

    if (clusters.length <= 0) {
      return (
        <tr><td colSpan="5"><center>No cluster added yet</center></td></tr>
      );
    }

    return (
      clusters.map(cluster => (
        <tr key={cluster.id}>
          <td>{cluster.id}</td>
          <td>{cluster.name}</td>
        </tr>
      ))
    );
  }

  renderClusterTable = () => {
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.renderClusterTableBody()}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="box">
        <div className="box-body">
          <div className="col-md-4">
            <ClusterForm />
          </div>
          <div className="col-md-8">
            {this.renderClusterTable()}
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
  fetchAllCluster: () => dispatch(clusterActions.fetchAllCluster())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClusterOverview);
