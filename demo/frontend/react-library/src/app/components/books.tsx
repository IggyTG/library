import * as React from "react";

export default class Books extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
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
                      ISBN
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Name
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Author
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Publish date
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
                      1
                    </th>
                    <td className="text-center align-middle">
                      book.category.name
                    </td>
                    <td className="text-center align-middle">book.isbn</td>
                    <td className="text-center align-middle">book.title</td>
                    <td className="text-center align-middle">book.author</td>
                    <td className="text-center align-middle">
                      book.publishDate
                    </td>
                    <td className="text-center align-middle">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-toggle="modal"
                        data-target="#saveBookModal"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-center align-middle">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="modal"
                        data-target="#deleteBookModal"
                      >
                        Delete
                      </button>
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
                type="button"
                className="btn btn-primary mr-2"
                data-toggle="modal"
                data-target="#saveBookModal"
              >
                Add Book
              </button>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        <div
          className="modal fade"
          id="deleteBookModal"
          role="dialog"
          aria-labelledby="deleteBookModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteBookModalLabel">
                  Delete Book
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
              <div className="modal-body">
                <p>
                  Do you want to delete <i>selectedBook?.title</i>, by{" "}
                  <i>selectedBook?.author</i>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Modal */}
        <div
          className="modal fade"
          id="saveBookModal"
          role="dialog"
          aria-labelledby="saveBookModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="saveBookModalLabel">
                  Add Book
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
                        <label htmlFor="category">Category</label>
                        <select
                          className="form-control"
                          id="category"
                          name="category"
                        >
                          <option disabled>Please select category</option>
                          <option>category.name</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select category!
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter book title!
                        </div>
                        <div className="invalid-feedback">error.title</div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="title">Author</label>
                        <input
                          type="text"
                          className="form-control"
                          id="author"
                          name="author"
                        />
                        <div className="invalid-feedback">
                          Please enter author name!
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="publishDate">Publish Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="publishDate"
                          name="publishDate"
                          max="getCurrentDate()"
                        />
                        <div className="invalid-feedback">
                          Please select publish date!
                        </div>
                        <div className="invalid-feedback">
                          error.publishDate
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="isbn">ISBN</label>
                        <input
                          type="text"
                          className="form-control"
                          id="isbn"
                          name="isbn"
                        />
                        <div className="invalid-feedback">
                          Please enter ISBN!
                        </div>
                        <div className="invalid-feedback">error.isbn</div>
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
      </React.Fragment>
    );
  }
}
