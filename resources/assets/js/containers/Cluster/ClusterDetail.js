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
  };

  componentDidMount() {
    const { fetchClusterById, match } = this.props;

    fetchClusterById(match.params.id);
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

  renderKeyTable = () => {
    return <div>clusterId : {this.props.match.params.id}</div>;
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
  patchCluster: (id, data) => dispatch(clusterActions.patchCluster(id, data))
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
