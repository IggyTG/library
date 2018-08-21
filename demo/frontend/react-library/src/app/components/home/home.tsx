import * as React from "react";
import CategoryList from "./category-list";
import BookList from "./books-list";
import { Category } from "../../model/category";
import BookService from "../../services/book.service";
import CategoryService from "../../services/category.service";
import { Book } from "../../model/book";
import { BtnCategory } from "./btn-category";

type MyState = {
  categories: Category[];
  categoryId: number;
  books: Book[];
  allBooks: Book[];
  buttons: BtnCategory[];
  isLoaded: boolean;
};

export default class Home extends React.Component<any, MyState> {
  bookService: BookService = new BookService();
  categoryService: CategoryService = new CategoryService();

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      books: [],
      allBooks: [],
      categoryId: 0,
      buttons: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    this.categoryService
      .getCategories()
      .then(response => {
        this.setState({ categories: response });
        this.setButtons();
      })
      .then(() => {
        this.setState({ isLoaded: true });
      });
    this.bookService.getBooks().then(response => {
      this.setState({ books: response, allBooks: response });
    });
  }

  handleCategoryPress(categoryId: number) {
    this.setState({ categoryId: categoryId });
    this.filterBooks(categoryId);
  }

  private filterBooks(categoryId: number) {
    let tmpBooks = this.state.allBooks;
    if (categoryId === 0) {
      this.setState({
        books: this.state.allBooks
      });
    } else {
      this.setState({
        books: tmpBooks.filter(book => book.category.id === categoryId)
      });
    }
  }

  private setButtons() {
    let buttons: BtnCategory[] = [];
    //add default btn
    let allBtn = new BtnCategory(0, true);
    buttons.push(allBtn);
    for (let index in this.state.categories) {
      let category = this.state.categories[index];
      let btn = new BtnCategory(category.id, false);
      buttons.push(btn);
    }
    this.setState({ buttons: buttons });
  }

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col">
            <div className="jumbotron">
              <h1 className="display-5">Library</h1>
              <p className="lead">
                Library is simple web application design to represent virtual
                library. Project was intentionally kept simple ie. it has only
                few entities but it shows usage of modern web java technologies.
              </p>
              <hr className="my-4" />
              <p>
                Project will be organized in several sections (named steps)
                where each one represents the final stage of the finished
                section.
              </p>
              <p className="lead">
                <a
                  className="btn btn-primary btn-lg"
                  href="https://github.com/IggyTG/library/"
                  role="button"
                >
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </div>
        {this.state.isLoaded && (
          <div className="row">
            <div className="col-lg-9">
              <BookList books={this.state.books} />
            </div>
            <div className="col-lg-3">
              <CategoryList
                categories={this.state.categories}
                buttons={this.state.buttons}
                onCategoryPress={this.handleCategoryPress.bind(this)}
                isLoaded={this.state.isLoaded}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
