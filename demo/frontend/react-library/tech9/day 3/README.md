# Day 3 Frontend: HTML5, CSS3, Bootstrap, React, Components, Routes, Webpack, Express

## Designing frontend presentation

After finishing the backend implementation today we will focus on designing the user interface with frontend technologies.
We will create all pages needed for this project, define routes and navigation for them,
get data from backend via REST endpoints and present it on the page.

## Reading

- [HTML5](https://dev.w3.org/html5/html-author/)
- [CSS3](https://www.w3schools.com/cssref/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [TypeScript](https://www.typescriptlang.org/docs)
- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/)
- [Express](https://expressjs.com/)

## Concepts

---

- Laying the foundation structure with HTML5, high level components like edit fields, buttons, lists etc.
- Adding styling with Bootstrap and CSS3
- Writing REST client-side to add interactive behaviour with React, which will be used to exchange data with backend

## Step 0 - Initial setup

---

1. Install VS Code.
2. Install Node.js.

## Step 1 - Add initial frontend setup structure

---

1. Working with react and typescript require lots of manual configuration.
   To skip that we have created initial configuration in provided material.
2. Webpack is used as a module builder.
3. ExpressJs is used as a server-side Web framework for Node.js.
4. In package.json we have declared all needed dependencies and configured build steps that coresponds webpack setup.
5. Run npm install to download all necessary dependencies
6. Create app/index.tsx and app/app.tsx
7. Create components: header, footer, home, books and categories
8. Start application with: npm run start-dev

## Step 2 - Define routes for the application

---

1. Add routes in app.tsx
2. Add html to header
3. Add navigation links in header
4. Add html to footer
5. Add header and footer tags to app component
6. Add BrowserRouter on index page
7. Add withRouter on app component

## Step 3 - Create models and services for Category and Book

---

1. Create class for category model
2. Create class for book model
3. Create category service and add functions to save, delete and get categories from REST api that will return promise.
4. Create book service, inject and add functions to save, delete and get books from REST api that will return promise.

## Step 4 - Generate additional nested components inside Home component and add HTML to the template of Home component and nested components

---

1. Create category-list component inside home component
2. Create btn-category model inside home component
3. Set btn-category buttons in home component
4. Initialize category-list component with getCategories() method from CategoryService and populate categories state.
5. Add and display categories to render method.
6. Create book-list component inside home component.
7. Initialize book-list component with getBooks() method from BookService and populate books state.
8. Add and display books to render method.
9. Add initial HTML code in home component template file with application description and link to it's github page.
10. Add category-list and book-list component to the home.component file and define their layout with bootstrap grid.

## Step 5 - Create filtering for book list

---

1. Add filterBooks method
2. Add onCategoryPress method and pass it as a prop to category-list component
3. Add setFilter and getButtonClass methods in category-list component

## Step 6 - Add initial HTML to the template of Category and Book component

1. Add initial HTML code, in categories component template file, for displaying list of categories in a table with Add, Edit and Delete buttons
2. Populate categories state with categoryService
3. Add initial HTML code, in books component template file, for displaying list of books in a table with Add, Edit and Delete buttons
4. Populate books state with booksService
