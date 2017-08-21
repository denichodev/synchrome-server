import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
  handleClick = e => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  };

  activeRoute = (routeName: string) => {
    return this.props.location.pathname.indexOf(routeName) > -1
      ? 'nav-item nav-dropdown open'
      : 'nav-item nav-dropdown';
  };

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ?
  // "nav nav-second-level collapse in": "nav nav-second-level collapse";
  // }

  render() {
    console.log(this.activeRoute('/calendar'));
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/'} className="nav-link" activeClassName="active">
                <i className="icon-home" /> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={'/calendar/view'}
                className="nav-link"
                activeClassName="active"
              >
                <i className="icon-calendar" /> Calendar
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
