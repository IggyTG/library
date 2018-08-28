import * as React from "react";
import { Category } from "../../model/category";
import { Button } from "react-bootstrap";
import { BtnCategory } from "./btn-category";

type MyProps = {
  categories: Category[];
  buttons: BtnCategory[];
  isLoaded: boolean;
};

type MyState = {
  buttons: BtnCategory[];
};

export default class CategoryList extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    this.getButtonClass = this.getButtonClass.bind(this);

    this.state = {
      buttons: this.props.buttons
    };
  }

  private getButtonClass(isActive: boolean) {
    return (
      "btn btn-outline-secondary list-group-item " +
      (isActive ? "active" : "default")
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="list-group mb-4 mt-3 mt-lg-0">
            <Button
              className={this.getButtonClass(this.state.buttons[0].isActive)}
            >
              All
            </Button>
            {this.props.categories.map((category: Category, index: number) => {
              return (
                <Button
                  className={this.getButtonClass(
                    this.state.buttons[index + 1].isActive
                  )}
                >
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
