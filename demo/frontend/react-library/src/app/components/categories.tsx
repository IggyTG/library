import * as React from "react";
import axios from "axios";
import Auth from "../auth";

const API = "http://localhost:8080/categories";

const containerStyle = {
  minHeight: "calc(100vh - 153px)"
};

export default class Categories extends React.Component {
  auth: Auth;

  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {}

  render() {
    /*const { hits, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }*/

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" className="text-center align-middle">
                      #
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Category
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Edit
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="text-center align-middle">
                      Header
                    </th>
                    <td className="text-center align-middle">category.name</td>
                    <td className="text-center align-middle">
                      <button
                        className="btn btn-outline-secondary"
                        data-toggle="modal"
                        data-target="#saveCategoryModal"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-center align-middle">
                      <span className="d-inline-block">
                        <button
                          className="btn btn-danger"
                          data-toggle="modal"
                          data-target="#deleteCategoryModal"
                        >
                          Delete
                        </button>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="float-right">
              <button
                className="btn btn-primary mr-2"
                data-toggle="modal"
                data-target="#saveCategoryModal"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deleteCategoryModal"
          role="dialog"
          aria-labelledby="deleteCategoryModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteCategoryModalLabel">
                  Delete Category
                </h5>
                <button
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Do you want to delete <i>selectedCategory.name</i> ?
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button className="btn btn-primary" data-dismiss="modal">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="saveCategoryModal"
          role="dialog"
          aria-labelledby="saveCategoryModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="saveCategoryModalLabel">
                  Category
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="category">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                        />
                        <div className="invalid-feedback">
                          Please enter category name!
                        </div>
                        <div className="invalid-feedback">error.name</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
