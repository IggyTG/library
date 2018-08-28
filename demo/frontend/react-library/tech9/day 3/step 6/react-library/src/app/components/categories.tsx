import * as React from "react";
import { Category } from "../model/category";
import {
  Modal,
  Button,
  ControlLabel,
  FormGroup,
  FormControl,
  Form,
  HelpBlock
} from "react-bootstrap";
import CategoryService from "../services/category.service";

type MyState = {
  category: Category;
  categories: Category[];
};

export default class Categories extends React.Component<null, MyState> {
  categoryService: CategoryService = new CategoryService();

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      category: new Category(null, null)
    };
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().then(response => {
      this.setState({ categories: response });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
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
                        Edit
                      </th>
                      <th scope="col" className="text-center align-middle">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.categories.map(
                      (category: Category, index: number) => {
                        return (
                          <tr>
                            <th
                              scope="row"
                              className="text-center align-middle"
                            >
                              {index + 1}
                            </th>
                            <td className="text-center align-middle">
                              {category.name}
                            </td>
                            <td className="text-center align-middle">
                              <Button className="btn btn-outline-secondary">
                                Edit
                              </Button>
                            </td>
                            <td className="text-center align-middle">
                              <Button className="btn btn-danger">Delete</Button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button className="btn btn-primary mr-2 pull-right">
                Add Category
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
