import * as React from "react";
import { History } from "history";
import Auth from "../services/auth.service";
import {
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  Form,
  Row,
  Col
} from "react-bootstrap";

type MyProps = { history: History; onLogin: Function };
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
    this.auth.login(this.state.username, this.state.password).then(data => {
      if (data === "error") {
        this.setState({ error: true });
      } else {
        this.props.onLogin();
        this.props.history.replace("/home");
      }
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
      <Row>
        <Col xs={4} xsOffset={4}>
          <Form onSubmit={this.login.bind(this)}>
            <FormGroup>
              <ControlLabel htmlFor="username">Username</ControlLabel>
              <FormControl
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.updateUsername.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel htmlFor="password">Password</ControlLabel>
              <FormControl
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.updatePassword.bind(this)}
              />
            </FormGroup>
            {this.state.error && (
              <div className="alert alert-danger">Bad credentials!</div>
            )}
            <Button className="btn btn-primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
