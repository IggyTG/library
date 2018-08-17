import * as React from "react";
import { Book } from "../model/book";
import { Category } from "../model/category";
import {
  Modal,
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  Form
} from "react-bootstrap";
import BookService from "../services/book.service";
import CategoryService from "../services/categories.service";

type MyState = {
  book: Book;
  books: Book[];
  categories: Category[];
  deleteShow: boolean;
  addShow: boolean;
};

export default class Books extends React.Component<any, MyState> {
  bookService: BookService = new BookService();
  categoryService: CategoryService = new CategoryService();

  constructor(props) {
    super(props);
    this.state = {
      book: new Book(null, null, null, null, null, null),
      deleteShow: false,
      addShow: false,
      books: [],
      categories: []
    };
  }

  handleGetCategories() {
    this.categoryService.getCategories().then(response => {
      this.setState({ categories: response });
    });
  }

  handleGetBooks() {
    this.bookService.getBooks().then(response => {
      this.setState({ books: response });
    });
  }

  handleDeleteBooks(book: Book) {
    this.bookService.deleteBook(book.id);
    this.handleDeleteClose();
    this.setState({ books: this.state.books.filter(obj => obj !== book) });
  }

  handleSaveBook(book) {
    this.bookService.saveBook(book);
    this.handleAddClose();
    this.setState({ books: this.state.books, book });
  }

  handleDeleteClose() {
    this.setState({ deleteShow: false });
  }

  handleDeleteShow(book: Book) {
    this.setState({
      deleteShow: true,
      book: book
    });
  }

  handleAddClose() {
    this.setState({ addShow: false });
  }

  handleAddShow() {
    this.setState({
      addShow: true,
      book: new Book(null, null, null, null, null, null)
    });
  }

  handleChange(event, objectProp) {
    let newBook = this.state.book;
    if (objectProp === "category") {
      let categoryProp = new Category(event.target.value, null);
      newBook[objectProp] = categoryProp;
    } else {
      newBook[objectProp] = event.target.value;
    }

    this.setState({ book: newBook });
  }

  handleSubmit(event) {
    //event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    this.handleSaveBook(data);

    console.log(data);
  }

  componentDidMount() {
    this.handleGetBooks();
    this.handleGetCategories();
  }

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
                  {this.state.books.map((books: Book, index: number) => {
                    return (
                      <tr>
                        <th scope="row" className="text-center align-middle">
                          {index + 1}
                        </th>
                        <td className="text-center align-middle">
                          {books.category.name}
                        </td>
                        <td className="text-center align-middle">
                          {books.isbn}
                        </td>
                        <td className="text-center align-middle">
                          {books.title}
                        </td>
                        <td className="text-center align-middle">
                          {books.author}
                        </td>
                        <td className="text-center align-middle">
                          {books.publishDate}
                        </td>
                        <td className="text-center align-middle">
                          <Button className="btn btn-outline-secondary">
                            Edit
                          </Button>
                        </td>
                        <td className="text-center align-middle">
                          <Button
                            className="btn btn-danger"
                            onClick={() => this.handleDeleteShow(books)}
                          >
                            Delete
                          </Button>
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
              <Button
                className="btn btn-primary mr-2"
                onClick={() => this.handleAddShow()}
              >
                Add Book
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
              <Modal.Title>Delete Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to delete <i>{this.state.book.title}</i>, by{" "}
              <i>{this.state.book.author}</i>?
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
                onClick={() => this.handleDeleteBooks(this.state.book)}
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
              <Modal.Title>Add Book</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>
                <FormGroup>
                  <ControlLabel>Category</ControlLabel>
                  <FormControl
                    componentClass="select"
                    defaultValue={0}
                    id="category"
                    name="category"
                    //onChange={event => this.handleChange(event, "category")}
                    required
                  >
                    <option value={0} disabled>
                      Please select category
                    </option>
                    {this.state.categories.map((category: Category) => {
                      return (
                        <option value={category.id}>{category.name}</option>
                      );
                    })}
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                    type="text"
                    id="title"
                    name="title"
                    //onChange={event => this.handleChange(event, "title")}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Author</ControlLabel>
                  <FormControl
                    type="text"
                    id="author"
                    name="author"
                    //onChange={event => this.handleChange(event, "author")}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Publish Date</ControlLabel>
                  <FormControl
                    type="date"
                    id="publishDate"
                    name="publishDate"
                    //onChange={event => this.handleChange(event, "publishDate")}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>ISBN</ControlLabel>
                  <FormControl
                    type="text"
                    id="isbn"
                    name="isbn"
                    //onChange={event => this.handleChange(event, "isbn")}
                    required
                  />
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
