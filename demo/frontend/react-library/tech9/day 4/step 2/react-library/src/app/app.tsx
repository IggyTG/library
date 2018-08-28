import * as React from "react";
import "./../assets/scss/app.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Books from "./components/books";
import Categories from "./components/categories";
import Header from "./components/header";
import Footer from "./components/footer";

const containerStyle = {
  minHeight: "calc(100vh - 153px)"
};

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col">
              <Switch>
                <Route exact path="/(/|home)" component={Home} />
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
