import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import { Book } from "../model/book";
import { Category } from "../model/category";
import BookService from "../services/book.service";
import CategoryService from "../services/category.service";

type MyState = {
  book: Book;
  books: Book[];
  category: Category;
  categories: Category[];
  deleteShow: boolean;
};

export default class Books extends React.Component<null, MyState> {
  bookService: BookService = new BookService();
  categoryService: CategoryService = new CategoryService();

  constructor(props) {
    super(props);
    this.state = {
      book: new Book(null, null, null, null, null, null),
      category: new Category(null, null),
      books: [],
      categories: [],
      deleteShow: false
    };
    this.handleDeleteClose = this.handleDeleteClose.bind(this);
  }

  componentDidMount() {
    this.handleGetBooks();
    this.handleGetCategories();
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

  handleDeleteClose() {
    this.setState({ deleteShow: false });
  }

  handleDeleteShow(book: Book) {
    this.setState({
      deleteShow: true,
      book: book
    });
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
                          <Button className="btn btn-outline-secondary">
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
            <Button className="btn btn-primary mr-2 pull-right">
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
      </React.Fragment>
    );
  }
}
