import * as React from "react";
import "./../assets/scss/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

const containerStyle = {
  minHeight: "calc(100vh - 153px)"
};

export interface AppProps {}

export default class App extends React.Component<AppProps, undefined> {
  render() {
    return (
      <div>
        <Header />
        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
