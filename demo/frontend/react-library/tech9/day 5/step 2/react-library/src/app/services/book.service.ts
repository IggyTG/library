import axios from "axios";
import { Book } from "../model/book";

const API = "http://localhost:8080/books";

export default class BookService {
  getBooks() {
    return axios.get(API).then(result => {
      return result.data;
    });
  }

  deleteBook(bookId: number) {
    return axios.delete(API + "/" + bookId).then(result => {
      return result.data;
    });
  }

  saveBook(book: Book) {
    return axios
      .post(API, book)
      .then(result => {
        return result.data;
      })
      .catch(error => {
        return { error: error.response.data.exceptions };
      });
  }

  updateBook(book: Book) {
    return axios
      .put(API, book)
      .then(result => {
        return result.data;
      })
      .catch(error => {
        return { error: error.response.data.exceptions };
      });
  }
}
