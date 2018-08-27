import * as React from "react";
import { Book } from "../../model/book";
const PlaceholderImage = require("../../../assets/img/placeholder.jpg");

type MyProp = {
  books: Book[];
};

export default class BookListList extends React.Component<MyProp, null> {
  constructor(props) {
    super(props);
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
                {this.props.books.map(function(book: Book, index: number) {
                  return (
                    <tr>
                      <th scope="row" className="text-center align-middle">
                        {index + 1}
                      </th>
                      <td className="text-center align-middle">{book.title}</td>
                      <td className="text-center align-middle">
                        <img
                          src={PlaceholderImage}
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
