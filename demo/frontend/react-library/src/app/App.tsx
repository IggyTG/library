import * as React from "react";
import "./../assets/scss/App.scss";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Categories from "./components/categories";
import Auth from "./auth";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home/home";
import Books from "./components/books";
import Login from "./components/login";

const containerStyle = {
  minHeight: "calc(100vh - 153px)"
};
type MyState = {
  isAuthenticated: boolean;
  admin: boolean;
};

class App extends React.Component<any, MyState> {
  private auth: Auth = new Auth();

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      admin: false
    };
  }

  componentWillMount() {
    this.setState({ isAuthenticated: this.auth.isAuthenticated() });
  }

  handleLogin() {
    this.setState({
      isAuthenticated: this.auth.isAuthenticated(),
      admin: this.auth.hasRoleAdmin()
    });

    this.props.history.replace("/home");
  }

  handleLogout() {
    this.auth.logout();
    this.setState({
      isAuthenticated: false,
      admin: false
    });
    this.props.history.replace("/login");
  }

  render() {
    return (
      <div>
        <Header
          isAuthenticated={this.state.isAuthenticated}
          admin={this.state.admin}
          onLogout={this.handleLogout.bind(this)}
        />
        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() =>
                    !this.auth.isAuthenticated() ? (
                      <Redirect to="/login" />
                    ) : (
                      <Home />
                    )
                  }
                />
                <Route path="/home" component={Home} />
                <Route
                  path="/login"
                  render={props => (
                    <Login onLogin={this.handleLogin.bind(this)} {...props} />
                  )}
                />
                <Route path="/categories" component={Categories} />
                <Route path="/books" component={Books} />
              </Switch>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
