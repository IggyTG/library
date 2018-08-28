import * as React from "react";
import { Category } from "../../model/category";
import { Button } from "react-bootstrap";
import { BtnCategory } from "./btn-category";

type MyProps = {
  onCategoryPress: Function;
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

    this.setFilter = this.setFilter.bind(this);
    this.getButtonClass = this.getButtonClass.bind(this);

    this.state = {
      buttons: this.props.buttons
    };
  }

  setFilter(filter: number) {
    let btnList = this.state.buttons;
    //change current active
    for (let i in btnList) {
      let btn = btnList[i];
      if (btn.isActive && btn.categoryId != filter) {
        btn.isActive = false;
        btnList[i] = btn;
      }
    }
    //change clicked button active
    for (let i in btnList) {
      let btn = btnList[i];
      if (btn.categoryId == filter) {
        btn.isActive = true;
        btnList[i] = btn;
        break;
      }
    }
    this.setState({ buttons: btnList });
    this.props.onCategoryPress(filter);
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
              onClick={() => this.setFilter(0)}
            >
              All
            </Button>
            {this.props.categories.map((category: Category, index: number) => {
              return (
                <Button
                  className={this.getButtonClass(
                    this.state.buttons[index + 1].isActive
                  )}
                  onClick={() => this.setFilter(category.id)}
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
