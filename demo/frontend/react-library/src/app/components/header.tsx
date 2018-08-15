import * as React from "react";
import { NavLink } from "react-router-dom";
import Auth from "../auth";
import User from "./user";
import { Navbar, NavItem, Nav } from "react-bootstrap";

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
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink className="nav-link" to="/">
              Library
            </NavLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
              {this.props.isAuthenticated && (
                <NavLink
                  className="nav-link"
                  activeClassName="is-active"
                  to="/home"
                >
                  Home
                </NavLink>
              )}
            </NavItem>
            <NavItem eventKey={2}>
              {this.props.admin && (
                <NavLink
                  className="nav-link"
                  activeClassName="is-active"
                  to="/categories"
                >
                  Categories
                </NavLink>
              )}
            </NavItem>
            <NavItem eventKey={3}>
              {this.props.admin && (
                <NavLink
                  className="nav-link"
                  activeClassName="is-active"
                  to="/books"
                >
                  Books
                </NavLink>
              )}
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>
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
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
