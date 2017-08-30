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
    return (
      <div>list</div>
    )
  }

  renderClusterTable = () => {
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>NIP</th>
            <th>Name</th>
            <th>Agency</th>
            <th>Echelon</th>
            <th>Actions</th>
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
