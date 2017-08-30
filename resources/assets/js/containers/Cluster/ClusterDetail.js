import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { clusterActions } from '../../ducks/cluster';
import { FormText } from '../../components/Forms';

class ClusterDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namefieldChanged: false
    };
  }

  componentDidMount() {
    const { fetchClusterById, match, fetchClusterKey } = this.props;

    fetchClusterById(match.params.id);
    fetchClusterKey(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.cluster.name !== this.props.cluster.name) {
      this.setState({ namefieldChanged: false });
    }

    if (nextProps.cluster.name && !this.state.namefieldChanged) {
      dispatch(change('editClusterForm', 'name', nextProps.cluster.name));
      this.setState({ namefieldChanged: true });
    }
  }

  disableKey = (keyId) => {
    const { disableClusterKey, match } = this.props;

    disableClusterKey(keyId, match.params.id);
  }

  renderKeyTable = () => {
    const { cluster } = this.props;

    if (cluster.keys.length <= 0) {
      return (
        <tr>
          <td colSpan="2"><center>No cluster key generated yet</center></td>
        </tr>
      );
    }

    return (
      cluster.keys.map((key) => (
        <tr key={key.key}>
          <td>{key.status === 1 ? (
            <span style={{ color: 'green' }}><i className="fa fa-check" /> Active</span>
          ) : (
            <span style={{ color: 'red' }}><i className="fa fa-ban" /> Disabled</span>
          )}</td>  
          <td>{key.key}</td>
          <td>{key.status === 1 ? (
            <button onClick={() => this.disableKey(key.id)} type="button" className="btn btn-danger btn-xs">Disable</button>            
          ) : (
            <button type="button" className="btn btn-disabled btn-xs" disabled>Disabled</button>
          )}
          </td>
        </tr>
      ))
    );
  };

  handleGenerate = () => {
    const { generateClusterKey } = this.props;

    generateClusterKey(this.props.match.params.id);
  };

  onSubmit = values => {
    console.log(values);
    const { patchCluster } = this.props;
    patchCluster(this.props.match.params.id, values);
  };

  render() {
    const { handleSubmit, cluster } = this.props;

    return (
      <div className="box">
        <div className="box-body">
          <div className="col-md-4">
            {cluster && (
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field label="Cluster name" name="name" component={FormText} />
                <button className="btn btn-primary pull-right" type="submit">
                  Edit Cluster
                </button>
              </form>
            )}
          </div>
          <div className="col-md-8">
            <div className="form-group pull-right">
              <button
                className="btn btn-primary pull-right"
                onClick={this.handleGenerate}
              >
                Generate Cluster Key
              </button>
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Key</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.renderKeyTable()}</tbody>
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
  fetchClusterById: id => dispatch(clusterActions.fetchClusterById(id)),
  generateClusterKey: id => dispatch(clusterActions.generateClusterKey(id)),
  patchCluster: (id, data) => dispatch(clusterActions.patchCluster(id, data)),
  fetchClusterKey: id => dispatch(clusterActions.fetchClusterKey(id)),
  disableClusterKey: (keyId, clusterId) => dispatch(clusterActions.disableClusterKey(keyId, clusterId))
});

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  return errors;
};

const formOptions = {
  form: 'editClusterForm',
  validate
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(
  ClusterDetail
);

export default reduxForm(formOptions)(connectedComponent);
