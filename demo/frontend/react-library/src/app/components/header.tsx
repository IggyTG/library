import * as React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Library
          </Link>
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
              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">
                  Books
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {"Username"}
                </Link>
                <div
                  className="dropdown-menu  dropdown-menu-right"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to="/">
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
