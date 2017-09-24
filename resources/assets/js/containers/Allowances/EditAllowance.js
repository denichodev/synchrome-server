import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { FormText } from '../../components/Forms';
import { allowancesActions } from '../../ducks/allowances';
import { required, number } from '../../helpers/validator';

class EditAllowance extends Component {
  componentDidMount() {
    const { setActive } = this.props;

    const id = this.props.match.params.id;

    setActive(id);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, active } = this.props;

    if (active !== nextProps.active) {
      dispatch(change('editAllowanceForm', 'id', nextProps.active.id));
      dispatch(change('editAllowanceForm', 'name', nextProps.active.name));
      dispatch(change('editAllowanceForm', 'tpp', nextProps.active.tpp));
      dispatch(change('editAllowanceForm', 'meal', nextProps.active.meal));
    }
  }

  renderEditForm = () => {
    const { handleSubmit, active } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          label="ID"
          name="id"
          placeholder="ID"
          component={FormText}
          disabled
          defaultValue={active.id}
          validate={[required]}
        />
        <Field
          label="Name"
          name="name"
          placeholder="Name"
          component={FormText}
          defaultValue={active.name}
          validate={[required]}
        />
        <Field
          label="TPP"
          name="tpp"
          placeholder="900000"
          component={FormText}
          validate={[required, number]}
        />
        <Field
          label="Meal"
          name="meal"
          placeholder="30000"
          component={FormText}
          validate={[required, number]}
        />
        <button className="btn btn-primary pull-right" type="submit">
          Edit Allowance {active.name}
        </button>
      </form>
    );
  };

  onSubmit = values => {
    const { editAllowance } = this.props;
    const id = this.props.match.params.id;

    editAllowance(id, values);
  };

  render() {
    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Edit Allowances</h3>
        </div>
        <div className="box-body">
          <div className="col-md-4">{this.renderEditForm()}</div>
        </div>
      </div>
    );
  }
}

const formOptions = {
  form: 'editAllowanceForm'
};

const mapStateToProps = state => ({
  active: state.allowances.active
});

const mapDispatchToProps = dispatch => ({
  editAllowance: (id, data) =>
    dispatch(allowancesActions.updateAllowances(id, data)),
  setActive: id => dispatch(allowancesActions.setActiveAllowance(id))
});

const connected = connect(mapStateToProps, mapDispatchToProps)(EditAllowance);

export default reduxForm(formOptions)(connected);
