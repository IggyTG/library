import axios from "axios";
import * as Cookies from "universal-cookie";

export interface User {
  username: string;
  roles: string[];
}

var HTTP_HEADERS;

export default class Auth {
  private cookies = new Cookies();

  login(username: string, password: string): Promise<any> {
    let self = this;

    const base64Credential = btoa(username + ":" + password);
    HTTP_HEADERS = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: "Basic " + base64Credential
    };

    return axios
      .get("http://localhost:8080/user", { headers: HTTP_HEADERS })
      .then(user => {
        this.cookies.set("user", user.data, { path: "/" });
        return user.data;
      })
      .catch(error => {
        console.log("Error while login!");
      });
  }

  getUser() {
    return this.cookies.get("user");
  }

  isAuthenticated() {
    return this.cookies.get("user") != undefined ? true : false;
  }

  getUsername() {
    let user = this.getUser();
    if (user) {
      return user.username;
    }
  }

  hasRoleAdmin() {
    let user = this.getUser();
    if (user) {
      return user.roles.includes("ROLE_ADMIN");
    }
  }

  logout() {
    this.cookies.remove("user", { path: "/" });
  }
}

export { HTTP_HEADERS };
