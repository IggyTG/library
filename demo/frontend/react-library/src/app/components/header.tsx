import * as React from "react";
import { NavLink } from "react-router-dom";
import Auth from "../auth";
import User from "./user";

type MyState = {
  isLoggedIn: boolean;
  admin: boolean;
};

type MyProps = { onLogout: Function; isAuthenticated: boolean; admin: boolean };

export default class Header extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, admin: false };
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Library
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {this.props.isAuthenticated && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="is-active"
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
              )}
              {this.props.admin && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="is-active"
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
              )}
              {this.props.admin && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="is-active"
                    to="/books"
                  >
                    Books
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {this.props.isAuthenticated && (
                <User onLogout={this.props.onLogout.bind(this)} />
              )}
              {!this.props.isAuthenticated && (
                <NavLink
                  className="nav-link"
                  activeClassName="is-active"
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
