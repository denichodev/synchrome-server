import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../ducks/user';

class UserOverview extends Component {
  componentDidMount() {
    const { getUsers } = this.props;

    getUsers();
  }

  renderUserTable = () => {
    const { user } = this.props;

    if (user.data.length <= 0) {
      return (
        <tr>
          <td colSpan="5">
            <center>No user added yet</center>
          </td>
        </tr>
      );
    }

    return user.data.map(user => (
      <tr key={user.id}>
        <td>{user.email}</td>
        <td>{user.name}</td>
        <td>{user.role.name}</td>
        <td>
          <Link to={`/panel/users/${user.id}`} className="btn btn-primary btn-xs">Edit</Link>&nbsp;
          <button type="button" className="btn btn-danger btn-xs">Delete</button>
        </td>
      </tr>
    ));
  };

  render() {
    return (
      <div className="box">
        <div className="box-body">
          <div className="form-group pull-right">
            <Link className="btn btn-primary" to="/panel/users/add-new">
              Add New User
            </Link>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.renderUserTable()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(userActions.getAllUser()),
  getUserById: id => dispatch(userActions.getUserById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
