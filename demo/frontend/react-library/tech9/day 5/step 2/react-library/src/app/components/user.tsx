import * as React from "react";
import Auth from "../services/auth.service";
import { NavDropdown, MenuItem } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./../../assets/scss/app.scss";

type MyState = { isAuthenticated: boolean };
type MyProps = { onLogout: Function };

export default class User extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true
    };
  }
  private auth = new Auth();

  logout() {
    this.props.onLogout();
  }

  render() {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/" push />;
    }

    return (
      <NavDropdown id="nav-dropdown" title={this.auth.getUsername()}>
        <MenuItem eventKey={4} onClick={this.logout.bind(this)}>
          Logout
        </MenuItem>
      </NavDropdown>
    );
  }
}
