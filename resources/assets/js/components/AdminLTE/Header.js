import React, { Component } from 'react';

export default class Header extends Component {
  handleClick = () => {
    // Pushing the menu
    const body = document.body;

    if (body.clientWidth > 768) {
      body.classList.toggle('sidebar-collapse');
    } else {
      body.classList.toggle('sidebar-open');
    }
  };

  render() {
    const { appName, appAbbr, userName, userEmail, csrfToken } = this.props;

    return (
      <header className="main-header">
        <a className="logo">
          <span className="logo-mini">{appAbbr}</span>
          <span className="logo-lg">{appName}</span>
        </a>

        <nav className="navbar navbar-static-top">
          <a
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
            onClick={this.handleClick}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </a>

          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src="/images/vendor/admin-lte/dist/user2-160x160.jpg"
                    className="user-image"
                    alt="User Image"
                  />
                  <span className="hidden-xs">{userName}</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="user-header">
                    <img
                      src="/images/vendor/admin-lte/dist/user2-160x160.jpg"
                      className="img-circle"
                      alt="User Image"
                    />
                    <p>
                      {userName}
                      <small>{userEmail}</small>
                    </p>
                  </li>
                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="#" className="btn btn-default btn-flat">
                        Profile
                      </a>
                    </div>
                    <div className="pull-right">
                      <form action="/auth/logout" method="POST">
                        <input type="hidden" name="_token" value={csrfToken} />
                        <button
                          type="submit"
                          className="btn btn-default btn-flat"
                        >
                          Sign out
                        </button>
                      </form>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
