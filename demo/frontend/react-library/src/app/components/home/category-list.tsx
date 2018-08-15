import * as React from "react";
import CategoryService from "../../services/categories.service";
import { Category } from "../../model/category";

type MyState = {
  selected: string;
  categories: Category[];
};

type MyProps = {};

export default class CategoryList extends React.Component<any, MyState> {
  categoryService: CategoryService = new CategoryService();

  constructor(props) {
    super(props);

    this.state = {
      selected: "",
      categories: []
    };
  }

  componentDidMount() {
    this.categoryService.getCategories().then(response => {
      this.setState({ categories: response });
    });
  }

  setFilter(filter: string) {
    this.setState({ selected: filter });
    this.props.onChangeFilter(filter);
  }

  isActive(value: string) {
    return (
      "btn btn-outline-secondary list-group-item " +
      (value === this.state.selected ? "active" : "default")
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="list-group mb-4 mt-3 mt-lg-0">
            <button
              type="button"
              className="btn btn-outline-secondary list-group-item active"
              onClick={() => this.setFilter("all")}
            >
              All
            </button>
            {this.state.categories.map(function(
              category: Category,
              index: number
            ) {
              return (
                <button
                  type="button"
                  className="btn btn-outline-secondary list-group-item default"
                  onClick={() => this.setFilter(category.name)}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
