import axios from "axios";
import * as Cookies from "universal-cookie";

export interface User {
  username: string;
  roles: string[];
}

export default class Auth {
  private cookies = new Cookies();

  login(username: string, password: string): Promise<any> {
    let self = this;

    const base64Credential = btoa(username + ":" + password);
    const httpHeaders = {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Authorization: "Basic " + base64Credential
    };

    return axios
      .get("http://localhost:8080/user", { headers: httpHeaders })
      .then(user => {
        this.cookies.set("user", user.data, { path: "/" });
        return user.data;
      })
      .catch(error => {
        console.log("Error while login!");
      });
  }

  isAuthenticated() {
    return this.cookies.get("user") != undefined ? true : false;
  }
}
