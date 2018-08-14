import * as React from "react";
import Auth from "../auth";
import { DropdownButton, MenuItem } from "react-bootstrap";
import { Redirect } from "react-router-dom";

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
      <DropdownButton noCaret bsStyle="default" title={this.auth.getUsername()}>
        <MenuItem eventKey="1" onClick={this.logout.bind(this)}>
          Logout
        </MenuItem>
      </DropdownButton>
    );
  }
}
