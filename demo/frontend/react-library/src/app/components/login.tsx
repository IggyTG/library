import * as React from "react";

export default class Login extends React.PureComponent {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}
