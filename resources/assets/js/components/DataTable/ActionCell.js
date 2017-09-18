import React from 'react';
import { Link } from 'react-router-dom';

const ActionCell = props => {
  return (
    <div>
      <Link
        to={`/panel/${props.column.route}/${props.original.id}`}
        className="btn btn-primary btn-xs"
      >
        Edit
      </Link>&nbsp;
      <button
        onClick={() => props.column.handleDelete(props.original.id)}
        type="button"
        className="btn btn-danger btn-xs"
      >
        Delete
      </button>
    </div>
  );
};

export default ActionCell;
