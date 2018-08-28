import * as React from "react";
import { Category } from "../model/category";
import {
  Modal,
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  Form,
  HelpBlock
} from "react-bootstrap";
import CategoryService from "../services/category.service";
import { Book } from "../model/book";
import BookService from "../services/book.service";

type MyState = {
  category: Category;
  categories: Category[];
  books: Book[];
  deleteShow: boolean;
};

export default class Categories extends React.Component<null, MyState> {
  categoryService: CategoryService = new CategoryService();
  bookService: BookService = new BookService();

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      books: [],
      category: new Category(null, null),
      deleteShow: false
    };
  }

  componentDidMount() {
    this.getCategories();
    this.getBooks();
  }

  getCategories() {
    this.categoryService.getCategories().then(response => {
      this.setState({ categories: response });
    });
  }

  getBooks() {
    this.bookService.getBooks().then(response => {
      this.setState({ books: response });
      this.updateDisabledCategories();
    });
  }

  handleDeleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id);
    this.handleDeleteClose();
    this.setState({
      categories: this.state.categories.filter(obj => obj !== category)
    });
  }

  handleDeleteClose() {
    this.setState({ deleteShow: false });
  }

  handleDeleteShow(category: Category) {
    this.setState({
      deleteShow: true,
      category: category
    });
  }

  updateDisabledCategories() {
    let categories = this.state.categories;
    for (let i in categories) {
      categories[i].hasBooks = this.ifCategoryExists(categories[i]);
    }
    this.setState({ categories: categories });
    console.log(this.state.categories);
  }

  ifCategoryExists(categoryToDelete: Category): boolean {
    console.log(this.state.books);
    if (this.state.books) {
      return this.state.books.some(
        book => book.category.id === categoryToDelete.id
      );
    }
    return false;
  }

  render() {
    return (
      <React.Fragment>
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
                    {this.state.categories.map(
                      (category: Category, index: number) => {
                        return (
                          <tr>
                            <th
                              scope="row"
                              className="text-center align-middle"
                            >
                              {index + 1}
                            </th>
                            <td className="text-center align-middle">
                              {category.name}
                            </td>
                            <td className="text-center align-middle">
                              <Button className="btn btn-outline-secondary">
                                Edit
                              </Button>
                            </td>
                            <td className="text-center align-middle">
                              <span
                                className="d-inline-block"
                                data-toggle="tooltip"
                                title={
                                  category.hasBooks
                                    ? "Category is in use!"
                                    : null
                                }
                              >
                                <Button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    this.handleDeleteShow(category)
                                  }
                                  disabled={category.hasBooks}
                                  data-toggle="tooltip"
                                  data-placement="top"
                                >
                                  Delete
                                </Button>
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button className="btn btn-primary mr-2 pull-right">
                Add Category
              </Button>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        <div>
          <Modal
            show={this.state.deleteShow}
            onHide={() => this.handleDeleteClose()}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to delete <i>{this.state.category.name}</i>?
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-secondary"
                onClick={() => this.handleDeleteClose()}
              >
                Close
              </Button>
              <Button
                className="btn btn-primary"
                onClick={() => this.handleDeleteCategory(this.state.category)}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
