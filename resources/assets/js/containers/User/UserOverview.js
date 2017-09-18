import React, { Component } from 'react';
import matchSorter from 'match-sorter';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../ducks/user';
import { FilterableTable, ActionCell } from '../../components/DataTable';

class UserOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          Header: 'Email',
          accessor: 'email',
          filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['email'] }),
          filterAll: true
        },
        {
          Header: 'Name',
          accessor: 'name',
          filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
          filterAll: true
        },
        {
          Header: 'Role',
          accessor: 'role',
          filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['role'] }),
          filterAll: true
        },
        {
          Header: 'Action',
          Cell: ActionCell,
          handleDelete: this.handleDeleteClick,
          route: 'users',
          filterable: false
        }
      ]
    };
  }

  componentDidMount() {
    const { getUsers } = this.props;

    getUsers();
  }

  handleDeleteClick = (id) => {
    const { deleteUser } = this.props;

    deleteUser(id);
  }

  getUserData = () => {
    const { user } = this.props;

    return user.data.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role.name
    }));
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

    return user.data.map(usr => (
      <tr key={usr.id}>
        <td>{usr.email}</td>
        <td>{usr.name}</td>
        <td>{usr.role.name}</td>
        <td>
          <Link to={`/panel/users/${usr.id}`} className="btn btn-primary btn-xs">Edit</Link>&nbsp;
          <button onClick={() => this.handleDeleteClick(usr.id)} type="button" className="btn btn-danger btn-xs">Delete</button>
        </td>
      </tr>
    ));
  };

  render() {
    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Users</h3>
        </div>
        <div className="box-body">
          <div className="form-group pull-right">
            <Link className="btn btn-primary" to="/panel/users/add-new">
              Add New User
            </Link>
          </div>
          <div className="col-md-12">
            <FilterableTable
              data={this.getUserData()}
              columns={this.state.columns}
            />
          </div>
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
  getUserById: id => dispatch(userActions.getUserById(id)),
  deleteUser: id => dispatch(userActions.deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
