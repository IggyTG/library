import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootEl = document.getElementById("root");

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootEl
);

// Hot Module Replacement API
declare let module: { hot: any };

if (module.hot) {
  module.hot.accept("./App", () => {
    const NewApp = require("./App").default;

    render(
      <AppContainer>
        <NewApp />
      </AppContainer>,
      rootEl
    );
  });
}
