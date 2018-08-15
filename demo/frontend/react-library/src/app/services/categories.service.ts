import axios from "axios";
import Auth, { HTTP_HEADERS } from "./auth";
import { Category } from "../model/category";

const API = "http://localhost:8080/categories";

export default class CategoryService {
  getCategories() {
    return axios.get(API, { headers: HTTP_HEADERS }).then(response => {
      return response.data;
    });
  }

  saveCategory(category: Category) {
    if (category.id) {
      return axios.put(API, category, { headers: HTTP_HEADERS });
    } else {
      return axios.post(API, category, { headers: HTTP_HEADERS });
    }
  }

  deleteCategory(categoryId: number) {
    return axios.delete(API + "/" + categoryId, { headers: HTTP_HEADERS });
  }
}
