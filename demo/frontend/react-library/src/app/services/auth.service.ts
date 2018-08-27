import axios from "axios";
import * as Cookies from "universal-cookie";

export interface User {
  username: string;
  roles: string[];
}

export default class Auth {
  private cookies = new Cookies();

  login(username: string, password: string): Promise<any> {
    const base64Credential = btoa(username + ":" + password);
    let HTTP_HEADERS = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: "Basic " + base64Credential
    };

    return axios
      .get("http://localhost:8080/user", { headers: HTTP_HEADERS })
      .then(user => {
        this.cookies.set("user", user.data, { path: "/" });
        this.cookies.set("auth", HTTP_HEADERS.Authorization, { path: "/" });
        return user.data;
      })
      .catch(error => {
        console.log("Error", error);
        return "error";
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

  getAuth() {
    return this.cookies.get("auth");
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
