import axios from "axios";
import Auth from "./auth";

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
}
