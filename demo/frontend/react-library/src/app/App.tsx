import * as React from "react";
import "./../assets/scss/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import Categories from "./components/categories";
import Auth from "./auth";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import Books from "./components/books";
import Login from "./components/login";

const containerStyle = {
  minHeight: "calc(100vh - 153px)"
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  private auth: Auth = new Auth();

  private isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() =>
                    !this.isLoggedIn() ? <Redirect to="/login" /> : <Home />
                  }
                />
                <Route path="/login" component={Login} />
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
