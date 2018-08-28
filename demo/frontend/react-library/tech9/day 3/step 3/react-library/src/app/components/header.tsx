import * as React from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "gray"
};

const activeLinkStyle = {
  textDecoration: "none",
  color: "black"
};

export default class Header extends React.Component {
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
            <NavItem eventKey={1}>
              <NavLink
                style={linkStyle}
                activeStyle={activeLinkStyle}
                to="/home"
              >
                Home
              </NavLink>
            </NavItem>

            <NavItem eventKey={2}>
              <NavLink
                style={linkStyle}
                activeStyle={activeLinkStyle}
                to="/categories"
              >
                Categories
              </NavLink>
            </NavItem>

            <NavItem eventKey={3}>
              <NavLink
                style={linkStyle}
                activeStyle={activeLinkStyle}
                to="/books"
              >
                Books
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
