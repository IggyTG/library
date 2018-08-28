import * as React from "react";
import { NavLink } from "react-router-dom";
import User from "./user";
import { Navbar, NavItem, Nav } from "react-bootstrap";

type MyState = {
  isLoggedIn: boolean;
  admin: boolean;
};

type MyProps = { onLogout: Function; isAuthenticated: boolean; admin: boolean };

const linkStyle = {
  textDecoration: "none",
  color: "gray"
};

const activeLinkStyle = {
  textDecoration: "none",
  color: "black"
};

export default class Header extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, admin: false };
  }

  render() {
    return (
      <Navbar activeKey={1}>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/">Library</NavLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {this.props.isAuthenticated && (
              <NavItem eventKey={1}>
                <NavLink
                  style={linkStyle}
                  activeStyle={activeLinkStyle}
                  to="/home"
                >
                  Home
                </NavLink>
              </NavItem>
            )}
            {this.props.isAuthenticated && (
              <NavItem eventKey={2}>
                <NavLink
                  style={linkStyle}
                  activeStyle={activeLinkStyle}
                  to="/categories"
                >
                  Categories
                </NavLink>
              </NavItem>
            )}
            {this.props.isAuthenticated && (
              <NavItem eventKey={3}>
                <NavLink
                  style={linkStyle}
                  activeStyle={activeLinkStyle}
                  to="/books"
                >
                  Books
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <Nav pullRight>
            {this.props.isAuthenticated && (
              <NavItem>
                <User onLogout={this.props.onLogout.bind(this)} />
              </NavItem>
            )}
            {!this.props.isAuthenticated && (
              <NavItem>
                <NavLink
                  style={linkStyle}
                  activeStyle={activeLinkStyle}
                  to="/login"
                >
                  Login
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
