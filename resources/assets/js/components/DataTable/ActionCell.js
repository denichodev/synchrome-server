import React from 'react';
import { Link } from 'react-router-dom';

const ActionCell = props => {
  return (
    <div>
      <Link
        to={`/panel/employees/${props.original.id}`}
        className="btn btn-primary btn-xs"
      >
        Edit
      </Link>&nbsp;
      <button
        onClick={() => this.handleDeleteClick(props.original.id)}
        type="button"
        className="btn btn-danger btn-xs"
      >
        Delete
      </button>
    </div>
  );
};

export default ActionCell;
