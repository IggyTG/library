import * as React from "react";
import Auth from "../auth";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  private auth = new Auth();

  logout() {
    this.auth.logout();
    history.push("/login");
  }

  render() {
    return (
      <div
        className="dropdown-menu  dropdown-menu-right"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <button className="dropdown-item" onClick={this.logout.bind(this)}>
          Logout
        </button>
      </div>
    );
  }
}
