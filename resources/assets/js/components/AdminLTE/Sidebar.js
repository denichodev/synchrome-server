import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li className="treeview">
              <Link to="/panel"><i className="fa fa-dashboard" />Panel</Link>
            </li>
            <li className="treeview">
              <Link to="/panel/calendars">
                <i className="fa fa-dashboard" /> <span>Calendars</span>
              </Link>
            </li>
            <li className="treeview">
              <Link to="/panel/clusters">
                <i className="fa fa-dashboard" /> <span>Clusters</span>
              </Link>
            </li>
            <li className="treeview">
              <Link to="/panel/employees">
                <i className="fa fa-dashboard" /> <span>Employees</span>
              </Link>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}
