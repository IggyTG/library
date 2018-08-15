import axios from "axios";
import Auth from "./auth";
import { Category } from "../model/category";

const API = "http://localhost:8080/categories";

export default class CategoryService {
  HTTP_HEADERS = {};

  private auth = new Auth();

  constructor() {
    this.HTTP_HEADERS = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: this.auth.getAuth()
    };
  }

  getCategories() {
    return axios.get(API, { headers: this.HTTP_HEADERS }).then(response => {
      return response.data;
    });
  }

  saveCategory(category: Category) {
    if (category.id) {
      return axios.put(API, category, { headers: this.HTTP_HEADERS });
    } else {
      return axios.post(API, category, { headers: this.HTTP_HEADERS });
    }
  }

  deleteCategory(categoryId: number) {
    return axios.delete(API + "/" + categoryId, { headers: this.HTTP_HEADERS });
  }
}
