import * as React from "react";
import { Book } from "../../model/book";
import BookService from "../../services/book.service";

type MyState = {
  selected: string;
  books: Book[];
};

export default class BookListList extends React.Component<any, MyState> {
  bookService: BookService = new BookService();

  constructor(props) {
    super(props);

    this.state = {
      selected: "",
      books: []
    };
  }

  componentDidMount() {
    this.bookService.getBooks().then(response => {
      this.setState({ books: response });
    });
  }

  setFilter(filter: string) {
    this.setState({ selected: filter });
    this.props.onChangeFilter(filter);
  }

  isActive(value: string) {
    return (
      "btn btn-outline-secondary list-group-item " +
      (value === this.state.selected ? "active" : "default")
    );
  }

  render() {
    return (
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
                    Name
                  </th>
                  <th scope="col" className="text-center align-middle">
                    Image
                  </th>
                  <th scope="col" className="text-center align-middle">
                    Author
                  </th>
                  <th scope="col" className="text-center align-middle">
                    Publish date
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map(function(book: Book, index: number) {
                  return (
                    <tr>
                      <th scope="row" className="text-center align-middle">
                        {index + 1}
                      </th>
                      <td className="text-center align-middle">{book.title}</td>
                      <td className="text-center align-middle">
                        <img
                          src="assets/images/placeholder.jpg"
                          alt="placeholder"
                          className="img-thumbnail"
                        />
                      </td>
                      <td className="text-center align-middle">
                        {book.author}
                      </td>
                      <td className="text-center align-middle">
                        {book.publishDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
