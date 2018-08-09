import * as React from "react";
import axios from "axios";
import Auth, { HTTP_HEADERS } from "../auth";
import { Category } from "../model/category";

const API = "http://localhost:8080/categories";

type MyState = {
  categories: Category[];
};

export default class Categories extends React.Component<any, MyState> {
  auth: Auth;

  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    axios.get(API, { headers: HTTP_HEADERS }).then(response => {
      this.setState({ categories: response.data });
    });
  }

  saveCategory(category: Category) {
    if (category.id) {
      return axios.put(API, category, { headers: HTTP_HEADERS });
    } else {
      return axios.post(API, category, { headers: HTTP_HEADERS });
    }
  }

  deleteCategory(categoryId: number) {
    return axios.delete(API + "/" + categoryId, { headers: HTTP_HEADERS });
  }

  render() {
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
                  {this.state.categories.map(function(
                    category: Category,
                    index: number
                  ) {
                    return (
                      <tr>
                        <th scope="row" className="text-center align-middle">
                          {index + 1}
                        </th>
                        <td className="text-center align-middle">
                          {category.name}
                        </td>
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
                    );
                  })}
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
