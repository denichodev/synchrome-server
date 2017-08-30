import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clusterActions } from '../../ducks/cluster';

class ClusterDetail extends Component {
  componentDidMount() {
    const { fetchClusterById, match } = this.props;

    console.log('fetching :', match.params.id);
    fetchClusterById(match.params.id);
  }

  renderKeyTable = () => {
    return (
      <div>clusterId : {this.props.match.params.id}</div>
    );
  }

  render() {
    return (
      <div className="box">
        <div className="box-body">
          <div className="col-md-8">
            Cluster Form
          </div>
          <div className="col-md-4">
            <div className="form-group pull-right">
              <button className="btn btn-primary pull-right">Generate Cluster Key</button>  
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.renderKeyTable()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cluster: state.cluster.active
});

const mapDispatchToProps = dispatch => ({
  fetchClusterById: id => dispatch(clusterActions.fetchClusterById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClusterDetail);
