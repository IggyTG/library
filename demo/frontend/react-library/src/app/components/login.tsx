import * as React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect,
  Prompt
} from "react-router-dom";
import { History } from "history";
import Auth from "../auth";

type MyProps = { history: History };
type MyState = { username: string; password: string; error: boolean };

export default class Login extends React.Component<MyProps, MyState> {
  error: string;
  auth: Auth = new Auth();

  constructor(props) {
    super(props);

    this.state = { username: "", password: "", error: false };
  }

  login(event) {
    event.preventDefault();

    this.auth
      .login(this.state.username, this.state.password)
      .then(user => {
        console.log("Authenticated!!!");
        this.props.history.replace("/categories");
      })
      .catch(error => {
        console.log("Not Authenticated!!!");
        this.setState({ error: false });
      });
  }

  updateUsername(event) {
    this.setState({ username: event.target.value });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <form onSubmit={this.login.bind(this)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.updateUsername.bind(this)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.updatePassword.bind(this)}
              />
            </div>
            {this.state.error && (
              <div className="alert alert-danger">Bad credentials!</div>
            )}
            <button className="btn btn-primary" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}
