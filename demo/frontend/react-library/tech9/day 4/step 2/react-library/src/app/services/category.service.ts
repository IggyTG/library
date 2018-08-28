import axios from "axios";
import { Category } from "../model/category";

const API = "http://localhost:8080/categories";

export default class CategoryService {
  getCategories() {
    return axios.get(API).then(response => {
      return response.data;
    });
  }

  saveCategory(category: Category) {
    return axios
      .post(API, category)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return { error: error.response.data.exceptions[0].message };
      });
  }

  deleteCategory(categoryId: number) {
    return axios.delete(API + "/" + categoryId);
  }

  updateCategory(category: Category) {
    return axios
      .put(API, category)
      .then(result => {
        return result.data;
      })
      .catch(error => {
        return { error: error.response.data.exceptions[0].message };
      });
  }
}
