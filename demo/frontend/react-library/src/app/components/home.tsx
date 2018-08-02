import * as React from "react";

const containerStyle = {
  minHeight: "calc(100vh - 153px)"
};

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col">
            <div className="jumbotron">
              <h1 className="display-5">Library</h1>
              <p className="lead">
                Library is simple web application design to represent virtual
                library. Project was intentionally kept simple ie. it has only
                few entities but it shows usage of modern web java technologies.
              </p>
              <hr className="my-4" />
              <p>
                Project will be organized in several sections (named steps)
                where each one represents the final stage of the finished
                section.
              </p>
              <p className="lead">
                <a
                  className="btn btn-primary btn-lg"
                  href="https://github.com/sjovic/library"
                  role="button"
                >
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9" />
        </div>
      </div>
    );
  }
}
