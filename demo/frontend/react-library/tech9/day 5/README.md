# Day 5: Adding security layer: Spring security, course wrap up

Adding security layer

---

Today we will add security layer to our application which will consist of basic authentication and will serve to  
authorize user for certain operations.

Reading

---

- [HTML5](https://dev.w3.org/html5/html-author/)
- [CSS3](https://www.w3schools.com/cssref/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [TypeScript](https://www.typescriptlang.org/docs)
- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/)
- [Express](https://expressjs.com/)
- [Bootstrap](https://getbootstrap.com/docs)

Concepts

---

- Spring Security
- Authentication vs authorization
- Encryption
- User roles

## Step 1 - Create Login component and authorization service

---

1. Generate "login" component.
2. Add form element with input fields for username, password and "Sign In" button in "login component" render method.
3. Pass values from login form to "Login()" method inside "login component".
4. Create AuthService class with "login" function that takes "username" and "password" as arguments, encodes them into base64 string and pass it as authorization headers to http GET request to check if user is authenticated.
5. If successfully authenticated store headers, user and set authenticated property to true in auth service.
6. Add function in auth service for getting authorization headers that is passed on every REST request.
7. Pass request headers, from "AuthService", on every request in book and category service.
8. Add functions in auth service for retrieving username and roles for displaying username in header component and displaying links in header based on roles of currently logged-in user.
9. Add "AuthService" to "header component".
10. Create user component and place it inside header component.
11. Add login link and dropdown for logging out in header template.
12. Add logout function in auth service that will clear all the user data and redirect user to the login page.

## Step 2 - Add request interceptor and create auth-guard service to restrict unauthorized routes

---

1. update conditioning route in app component and render login component if user is not authenticated
