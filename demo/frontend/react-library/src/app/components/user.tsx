import * as React from "react";
import Auth from "../auth";
import { DropdownButton, MenuItem } from "react-bootstrap";
import { Redirect } from "react-router-dom";

type MyState = { isAuthenticated: boolean };

export default class User extends React.Component<any, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true
    };
  }
  private auth = new Auth();

  logout() {
    this.auth.logout();
    this.setState({ isAuthenticated: false });
  }

  render() {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/" push />;
    }

    return (
      <DropdownButton noCaret bsStyle="default" title={this.auth.getUsername()}>
        <MenuItem eventKey="1" onClick={this.logout.bind(this)}>
          Logout
        </MenuItem>
      </DropdownButton>
    );
  }
}
