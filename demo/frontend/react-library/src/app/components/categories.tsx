import * as React from "react";
import {
  Modal,
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  Form,
  HelpBlock,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";
import { Category } from "../model/category";
import CategoryService from "../services/category.service";
import { Book } from "../model/book";
import BookService from "../services/book.service";

type MyState = {
  category: Category;
  categories: Category[];
  books: Book[];
  deleteShow: boolean;
  addShow: boolean;
  operation: string;
  error: string;
};

export default class Categories extends React.Component<any, MyState> {
  categoryService: CategoryService = new CategoryService();
  bookService: BookService = new BookService();

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      books: [],
      category: new Category(null, null),
      deleteShow: false,
      addShow: false,
      operation: "",
      error: ""
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

  handleGetCategories() {
    this.categoryService.getCategories().then(response => {
      this.setState({ categories: response });
    });
  }

  handleDeleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id);
    this.handleDeleteClose();
    this.setState({
      categories: this.state.categories.filter(obj => obj !== category)
    });
  }

  handleSaveCategory(category: Category) {
    this.categoryService.saveCategory(category).then(response => {
      if (!response.error) {
        this.setState({ categories: this.state.categories.concat(response) });
        this.handleAddClose();
      } else {
        this.setState({ error: response.error });
      }
    });
  }

  handleUpdateCategory(category: Category) {
    this.categoryService.updateCategory(category).then(response => {
      if (!response.error) {
        this.handleAddClose();

        let categoriesCopy = this.state.categories.slice();
        let categoryIndex = categoriesCopy.findIndex(
          categoryCopy => categoryCopy.id === category.id
        );
        categoriesCopy[categoryIndex] = category;
        this.setState({ categories: categoriesCopy });
      } else {
        this.setState({ error: response.error });
      }
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

  handleAddClose() {
    this.setState({ addShow: false, error: "" });
  }

  handleAddShow(category: Category) {
    if (category === null) {
      this.setState({
        addShow: true,
        category: new Category(null, null),
        operation: "Add"
      });
    } else {
      this.setState({
        addShow: true,
        category: category,
        operation: "Edit"
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const newCategory = Object.assign({}, this.state.category);
    const formData: any = new FormData(event.target);
    formData.forEach((value, name) => {
      if (name === "category") {
        let category: Category = this.state.categories.find(
          category => Number(value) === category.id
        );
        newCategory[name] = category;
      } else {
        newCategory[name] = value;
      }
    });

    if (this.state.operation === "Add") {
      this.handleSaveCategory(newCategory);
    } else {
      this.handleUpdateCategory(newCategory);
    }
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
    const tooltip = <Tooltip id="tooltip">Category is in use!</Tooltip>;

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
                              <Button
                                className="btn btn-outline-secondary"
                                onClick={() => this.handleAddShow(category)}
                              >
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
              <Button
                className="btn btn-primary mr-2 pull-right"
                onClick={() => this.handleAddShow(null)}
              >
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

        {/* Save Modal */}
        <div>
          <Modal show={this.state.addShow} onHide={() => this.handleAddClose()}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.operation} Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => this.handleSubmit(event)}>
              <Modal.Body>
                <FormGroup
                  validationState={this.state.error !== "" ? "error" : null}
                >
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    defaultValue={this.state.category.name}
                    type="text"
                    id="name"
                    name="name"
                    required
                  />
                  <HelpBlock>{this.state.error}</HelpBlock>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btn btn-secondary"
                  onClick={() => this.handleAddClose()}
                >
                  Close
                </Button>
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
