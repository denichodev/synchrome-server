import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h3>
          <i className="fa fa-warning text-yellow" /> Oops! You must be an administrator to see this.
        </h3>

        <p>
          You are an operator trying to access administrator page, please don't do it. Meanwhile, you may{' '}
          <Link to="/panel">return to panel</Link>.
        </p>

      </div>
    </div>
  );
};

export default Error404;
