import axios from "axios";
import Auth from "./auth.service";
import { Book } from "../model/book";

const API = "http://localhost:8080/books";

export default class BookService {
  private auth = new Auth();
  HTTP_HEADERS = {};

  constructor() {
    this.HTTP_HEADERS = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: this.auth.getAuth()
    };
  }

  getBooks() {
    return axios.get(API, { headers: this.HTTP_HEADERS }).then(result => {
      return result.data;
    });
  }

  deleteBook(bookId: number) {
    return axios
      .delete(API + "/" + bookId, { headers: this.HTTP_HEADERS })
      .then(result => {
        return result.data;
      });
  }

  saveBook(book: Book) {
    return axios
      .post(API, book, { headers: this.HTTP_HEADERS })
      .then(result => {
        return result.data;
      })
      .catch(error => {
        return { error: error.response.data.exceptions };
      });
  }

  updateBook(book: Book) {
    return axios
      .put(API, book, { headers: this.HTTP_HEADERS })
      .then(result => {
        return result.data;
      })
      .catch(error => {
        return { error: error.response.data.exceptions };
      });
  }
}
