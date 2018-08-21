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
import CategoryService from "../services/category.service";

type MyState = {
  book: Book;
  books: Book[];
  category: Category;
  categories: Category[];
  deleteShow: boolean;
  addShow: boolean;
  operation: string;
};

export default class Books extends React.Component<any, MyState> {
  bookService: BookService = new BookService();
  categoryService: CategoryService = new CategoryService();

  constructor(props) {
    super(props);
    this.state = {
      book: new Book(null, null, null, null, null, null),
      category: new Category(null, null),
      deleteShow: false,
      addShow: false,
      books: [],
      categories: [],
      operation: ""
    };

    this.formatDate = this.formatDate.bind(this);
    this.handleDeleteClose = this.handleDeleteClose.bind(this);
    this.handleAddClose = this.handleAddClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleDeleteBook(book: Book) {
    this.bookService.deleteBook(book.id);
    this.handleDeleteClose();
    this.setState({ books: this.state.books.filter(obj => obj !== book) });
  }

  handleSaveBook(book: Book) {
    this.bookService.saveBook(book).then(newBook => {
      newBook.publishDate = this.formatDate(newBook.publishDate);
      this.setState({
        books: this.state.books.concat(newBook)
      });
    });
    this.handleAddClose();
    this.setState({ books: this.state.books.concat(book) });
  }

  handleUpdateBook(book: Book) {
    this.bookService.updateBook(book);
    this.handleAddClose();

    let booksCopy = this.state.books.slice();
    let bookIndex = booksCopy.findIndex(bookCopy => bookCopy.id === book.id);
    booksCopy[bookIndex] = book;
    this.setState({ books: booksCopy });
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

  handleAddShow(book: Book) {
    if (book === null) {
      this.setState({
        addShow: true,
        book: new Book(null, null, null, null, null, null),
        category: new Category(null, null),
        operation: "Add"
      });
    } else {
      this.setState({
        addShow: true,
        book: book,
        category: book.category,
        operation: "Edit"
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const newBook = Object.assign({}, this.state.book);
    const formData: any = new FormData(event.target);
    formData.forEach((value, name) => {
      if (name === "category") {
        let category: Category = this.state.categories.find(
          category => Number(value) === category.id
        );
        newBook[name] = category;
      } else {
        newBook[name] = value;
      }
    });

    if (this.state.operation === "Add") {
      this.handleSaveBook(newBook);
    } else {
      this.handleUpdateBook(newBook);
    }
  }

  formatDate(publishDate: Date) {
    return new Date(publishDate).toISOString().slice(0, 10);
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
                      Title
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
                  {this.state.books.map((book: Book, index: number) => {
                    return (
                      <tr>
                        <th scope="row" className="text-center align-middle">
                          {index + 1}
                        </th>
                        <td className="text-center align-middle">
                          {book.category.name}
                        </td>
                        <td className="text-center align-middle">
                          {book.isbn}
                        </td>
                        <td className="text-center align-middle">
                          {book.title}
                        </td>
                        <td className="text-center align-middle">
                          {book.author}
                        </td>
                        <td className="text-center align-middle">
                          {book.publishDate}
                        </td>
                        <td className="text-center align-middle">
                          <Button
                            className="btn btn-outline-secondary"
                            onClick={this.handleAddShow.bind(this, book)}
                          >
                            Edit
                          </Button>
                        </td>
                        <td className="text-center align-middle">
                          <Button
                            className="btn btn-danger"
                            onClick={this.handleDeleteShow.bind(this, book)}
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
            <Button
              className="btn btn-primary mr-2 pull-right"
              onClick={this.handleAddShow.bind(this, null)}
            >
              Add Book
            </Button>
          </div>
        </div>

        {/* Delete Modal */}
        <div>
          <Modal show={this.state.deleteShow} onHide={this.handleDeleteClose}>
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
                onClick={this.handleDeleteClose}
              >
                Close
              </Button>
              <Button
                className="btn btn-primary"
                onClick={this.handleDeleteBook.bind(this, this.state.book)}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* Save Modal */}
        <div>
          <Modal show={this.state.addShow} onHide={this.handleAddClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.operation} Book</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.handleSubmit}>
              <Modal.Body>
                <FormGroup>
                  <ControlLabel>Category</ControlLabel>
                  <FormControl
                    componentClass="select"
                    defaultValue={this.state.category.id || ""}
                    id="category"
                    name="category"
                    required
                  >
                    <option value={""} disabled>
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
                    defaultValue={this.state.book.title}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Author</ControlLabel>
                  <FormControl
                    type="text"
                    id="author"
                    name="author"
                    defaultValue={this.state.book.author}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Publish Date</ControlLabel>
                  <FormControl
                    type="date"
                    id="publishDate"
                    name="publishDate"
                    defaultValue={this.state.book.publishDate}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>ISBN</ControlLabel>
                  <FormControl
                    type="text"
                    id="isbn"
                    name="isbn"
                    defaultValue={this.state.book.isbn}
                    required
                  />
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btn btn-secondary"
                  onClick={this.handleAddClose}
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
