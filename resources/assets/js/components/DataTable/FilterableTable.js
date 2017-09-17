import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';

const FilterableTable = props => {
  return (
    <ReactTable
      {...props}
      pageSizeOptions={[5, 10, 20, 50, 100]}
      defaultPageSize={[10]}
      filterable={props.filterable}
    />
  );
};

FilterableTable.defaultProps = {
  filterable: true
};

FilterableTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  filterable: PropTypes.bool
};

export default FilterableTable;
