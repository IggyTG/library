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
  addShow: boolean;
  operation: string;
  error: string;
};

export default class Categories extends React.Component<null, MyState> {
  categoryService: CategoryService = new CategoryService();

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      category: new Category(null, null),
      addShow: false,
      operation: "",
      error: ""
    };
  }

  handleSaveCategory(category: Category) {
    this.categoryService.saveCategory(category).then(response => {
      if (!response.error) {
        this.setState({ categories: this.state.categories.concat(response) });
        this.handleAddClose();
      } else {
        this.setState({ error: response.error });
      }
    });
  }

  handleUpdateCategory(category: Category) {
    this.categoryService.updateCategory(category).then(response => {
      if (!response.error) {
        this.handleAddClose();

        let categoriesCopy = this.state.categories.slice();
        let categoryIndex = categoriesCopy.findIndex(
          categoryCopy => categoryCopy.id === category.id
        );
        categoriesCopy[categoryIndex] = category;
        this.setState({ categories: categoriesCopy });
      } else {
        this.setState({ error: response.error });
      }
    });
  }

  handleAddClose() {
    this.setState({ addShow: false, error: "" });
  }

  handleAddShow(category: Category) {
    if (category === null) {
      this.setState({
        addShow: true,
        category: new Category(null, null),
        operation: "Add"
      });
    } else {
      this.setState({
        addShow: true,
        category: category,
        operation: "Edit"
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const newCategory = Object.assign({}, this.state.category);
    const formData: any = new FormData(event.target);
    formData.forEach((value, name) => {
      if (name === "category") {
        let category: Category = this.state.categories.find(
          category => Number(value) === category.id
        );
        newCategory[name] = category;
      } else {
        newCategory[name] = value;
      }
    });

    if (this.state.operation === "Add") {
      this.handleSaveCategory(newCategory);
    } else {
      this.handleUpdateCategory(newCategory);
    }
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
                              <Button
                                className="btn btn-outline-secondary"
                                onClick={() => this.handleAddShow(category)}
                              >
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
              <Button
                className="btn btn-primary mr-2 pull-right"
                onClick={() => this.handleAddShow(null)}
              >
                Add Category
              </Button>
            </div>
          </div>
        </div>

        {/* Save Modal */}
        <div>
          <Modal show={this.state.addShow} onHide={() => this.handleAddClose()}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.operation} Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => this.handleSubmit(event)}>
              <Modal.Body>
                <FormGroup
                  validationState={this.state.error !== "" ? "error" : null}
                >
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    defaultValue={this.state.category.name}
                    type="text"
                    id="name"
                    name="name"
                    required
                  />
                  <HelpBlock>{this.state.error}</HelpBlock>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="btn btn-secondary"
                  onClick={() => this.handleAddClose()}
                >
                  Close
                </Button>
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
