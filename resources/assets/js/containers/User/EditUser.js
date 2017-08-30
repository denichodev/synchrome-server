import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { userActions } from '../../ducks/user';
import { FormText, FormSelection, FormPassword } from '../../components/Forms';

class EditUser extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      shouldUpdateField: false
    }
  }
  componentDidMount() {
    const { getRoles, match, getUserById } = this.props;
    const id = match.params.id;

    getRoles();
    getUserById(id);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.activeUser.id && !this.state.shouldUpdateField) {
      dispatch(change('editUserForm', 'name', nextProps.activeUser.name));
      dispatch(change('editUserForm', 'email', nextProps.activeUser.email));
      dispatch(change('editUserForm', 'role_id', nextProps.activeUser.role.id));
      this.setState({ shouldUpdateField: true });
    }
  }

  onSubmit = values => {
    console.log(values);
    const { updateUser, match } = this.props;

    updateUser(match.params.id, values);
  }

  renderUserForm = () => {
    const { handleSubmit, roles } = this.props;
    // name, email, password, password_conf, role_id
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="name"
          placeholder="John Doe"
          label="Name"
          component={FormText}
        />
        <Field
          name="email"
          placeholder="example@example.com"
          label="Email Address"
          component={FormText}
        />
        <Field
          name="password"
          label="Password"
          component={FormPassword}
        />
        <Field
          name="password_conf"
          label="Confirm Password"
          component={FormPassword}
        />
        <Field
          name="role_id"
          label="Role"
          component={FormSelection}
          optionsData={roles}
        />
        <button className="btn btn-primary pull-right" type="submit">Edit User</button>
      </form>
    );
  }

  render() {
    return (
      <div className="box">
        <div className="box-header with-border">
          Edit User
        </div>
        <div className="box-body">
          {this.renderUserForm()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roles: state.user.role,
  activeUser: state.user.active
})

const mapDispatchToProps = dispatch => ({
  updateUser: (id, data) => dispatch(userActions.updateUser(id, data)),
  getRoles: () => dispatch(userActions.getRole()),
  getUserById: id => dispatch(userActions.getUserById(id))
});

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length <= 8) {
    errors.password = 'Must be greater than 8 characters';
  }
  if (!values.password_conf) {
    errors.password_conf = 'Required';
  } else if (values.password !== values.password_conf) {
    errors.password_conf = 'Password do not match';
  }

  return errors;
};

const formOptions = {
  form: 'editUserForm',
  validate
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(EditUser);

export default reduxForm(formOptions)(connectedComponent);
