import axios from "axios";
import { HTTP_HEADERS } from "./auth";

const API = "http://localhost:8080/books";

export default class BookService {
  getBooks() {
    return axios.get(API, { headers: HTTP_HEADERS }).then(result => {
      return result.data;
    });
  }
}
