import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { userActions } from '../../ducks/user';
import { FormText, FormSelection, FormPassword } from '../../components/Forms';
import validator from '../../helpers/validator';

class NewUser extends Component {

  componentWillMount() {
    const { initialize } = this.props;
    initialize({ role_id: '2' });
  }

  componentDidMount() {
    const { getRoles } = this.props;

    getRoles();
  }

  onSubmit = values => {
    const { postUser } = this.props;

    postUser(values);
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
          validate={[validator.required]}
        />
        <Field
          name="email"
          placeholder="example@example.com"
          label="Email Address"
          component={FormText}
          validate={[validator.required, validator.email]}
        />
        <Field
          name="password"
          label="Password"
          component={FormPassword}
          validate={[validator.required]}          
        />
        <Field
          name="password_conf"
          label="Confirm Password"
          component={FormPassword}
          validate={[validator.required]}          
        />
        <Field
          name="role_id"
          label="Role"
          component={FormSelection}
          optionsData={roles}
          validate={[validator.required]}          
        />
        <button className="btn btn-primary pull-right" type="submit">Submit</button>
      </form>
    );
  }

  render() {
    return (
      <div className="box">
        <div className="box-header with-border">
          Add New User
        </div>
        <div className="box-body">
          {this.renderUserForm()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roles: state.user.role
})

const mapDispatchToProps = dispatch => ({
  postUser: data => dispatch(userActions.postUser(data)),
  getRoles: () => dispatch(userActions.getRole())  
});

const validate = values => {
  const errors = {};

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
  form: 'newUserForm',
  validate
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewUser);

export default reduxForm(formOptions)(connectedComponent);
