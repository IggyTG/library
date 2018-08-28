# Day 4 Frontend: Modals, Forms and Form Validation, Error messages, Subject

## Designing frontend presentation

Today we will be working on basic validation and data input on frontend.
After that data will be sent to backend via exposed REST endpoints.
Also, we will validate data entry and present any potential error messages to user that system might throw.

## Reading

- [HTML5](https://dev.w3.org/html5/html-author/)
- [CSS3](https://www.w3schools.com/cssref/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [TypeScript](https://www.typescriptlang.org/docs)
- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/)
- [Express](https://expressjs.com/)
- [Bootstrap](https://getbootstrap.com/docs)

## Concepts

- Laying the foundation structure with HTML5, high level components like edit fields, buttons, lists etc.
- Adding styling with Bootstrap and CSS3
- Writing REST client-side to add interactive behaviour with Angular, which will be used to exchange data with backend

## Step 1 - Add HTML and TypeScript code for deleting books and categories

1. Add delete modal dialog in books template to confirm deleting of the selected book.
2. Add action for opening dialog and passing selected book on Delete button click in table.
3. Add function for getting selected book for deletion and assign it to "selected book" in state
4. Add function that will delete selected book by calling delete function from services and update list of books if successfully deleted by backend.
5. Add delete modal dialog in categories template to confirm deleting of the selected category.
6. Add action for opening dialog and passing selected category on Delete button click in table.
7. Add function for getting selected category for deletion and assign it to "selected category" in state.
8. Add function that will delete selected category by calling delete function from services and update list of categories if successfully deleted by backend.
9. Add function to prevent from deleting category that is assigned to a book (initialize "books" state with "getBooks()" method from book service in "componentDidMount").

## Step 2 - Add save and edit modal for adding new categories

1. Add modal dialog with form and input element, in "categories component", for adding new category.
2. Add onClick event and fucntionality for show/hide modal.
3. Add onSubmit method.
4. Validate and save new category
5. implement error valdiation and display error message
6. Add operation state property
7. Add state.operation to modal title
8. Update onSubmit and save method to perform edit also

## Step 3 - Add save and edit modal for adding new books

1. Add modal dialog with form and input element, in "books component", for adding new book.
2. Add onClick event and fucntionality for show/hide modal.
3. Add onSubmit method.
4. Validate and save new book
5. implement error valdiation and display error message
6. Add operation state property
7. Add state.operation to modal title
8. Update onSubmit and save method to perform edit also
