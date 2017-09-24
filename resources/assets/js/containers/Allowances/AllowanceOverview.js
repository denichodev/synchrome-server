import React, { Component } from 'react';
import matchSorter from 'match-sorter';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { allowancesActions } from '../../ducks/allowances';
import { FormText } from '../../components/Forms';
import { FilterableTable, ActionCell } from '../../components/DataTable';

class AllowanceOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          Header: 'ID',
          id: 'id',
          accessor: d => d.id,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ['id'] }),
          filterAll: true
        },
        {
          Header: 'Name',
          id: 'name',
          accessor: d => d.name,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ['id'] }),
          filterAll: true
        },
        {
          Header: 'TPP',
          id: 'tpp',
          accessor: d => d.tpp,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ['id'] }),
          filterAll: true
        },
        {
          Header: 'Meal',
          id: 'meal',
          accessor: d => d.meal,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ['id'] }),
          filterAll: true
        },
        {
          Header: 'Actions',
          route: 'allowances',
          handleDelete: this.deleteAllowances,
          Cell: ActionCell,
          filterable: false
        }
      ]
    };
  }

  componentDidMount() {
    const { fetchAllowances } = this.props;
    fetchAllowances();
  }

  deleteAllowances = id => {
    const { deleteAllowances } = this.props;

    deleteAllowances(id);
  };

  renderAllowancesForm = () => {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field label="ID" name="id" placeholder="ID" component={FormText} />
        <Field
          label="Name"
          name="name"
          placeholder="Name"
          component={FormText}
        />
        <Field
          label="TPP"
          name="tpp"
          placeholder="900000"
          component={FormText}
        />
        <Field
          label="Meal"
          name="meal"
          placeholder="30000"
          component={FormText}
        />
        <button className="btn btn-primary pull-right" type="submit">
          Add New Allowance
        </button>
      </form>
    );
  };

  onSubmit = values => {
    const { postAllowances } = this.props;

    postAllowances(values);
  };

  render() {
    const { data } = this.props.allowances;

    return (
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Allowances</h3>
        </div>
        <div className="box-body">
          <div className="col-md-4">{this.renderAllowancesForm()}</div>
          <div className="col-md-8 clear-padding">
            <FilterableTable data={data} columns={this.state.columns} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allowances: state.allowances
});

const mapDispatchToProps = dispatch => ({
  fetchAllowances: () => dispatch(allowancesActions.fetchAllowances()),
  postAllowances: data => dispatch(allowancesActions.postAllowances(data)),
  deleteAllowances: id => dispatch(allowancesActions.deleteAllowances(id)),
  setActiveAllowance: id => dispatch(allowancesActions.setActiveAllowance(id))
});

const formOptions = {
  form: 'allowancesForm'
};

const connected = connect(mapStateToProps, mapDispatchToProps)(
  AllowanceOverview
);

export default reduxForm(formOptions)(connected);
