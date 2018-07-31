import * as React from "react";
import "./../assets/scss/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Categories from "./components/categories";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";

const containerStyle = {
  minHeight: "calc(100vh - 153px)"
};

export interface AppProps {}

export default class App extends React.Component<AppProps, undefined> {
  render() {
    return (
      <Switch>
        <div className="container">
          <Header />
          <div className="container" style={containerStyle}>
            <div className="row">
              <div className="col">
                <Route exact path="/" component={Home} />
                <Route path="/categories" component={Categories} />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Switch>
    );
  }
}
