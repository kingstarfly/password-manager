/**
 * This represents some generic auth provider API, like Firebase.
 */

import Cookies from "js-cookie";
import { BASE_URL } from "../api/constants";

const authProvider = {
  isAuthenticated: false,
  signin(
    email: string,
    password: string,
    callback: (isSuccessful: boolean) => void
  ) {
    fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 200) {
        callback(true);
      } else {
        console.error("Login failed", response.status);
        callback(false);
      }
    });
  },
  register(
    email: string,
    password: string,
    callback: (isSuccessful: boolean) => void
  ) {
    fetch(BASE_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 200) {
        callback(true);
      } else {
        console.error("Register failed", response.status);
        callback(false);
      }
    });
  },
  signout(callback: VoidFunction) {
    fetch(BASE_URL + "/auth/logout", {
      method: "DELETE",
      credentials: "include",
      headers: new Headers({
        "X-CSRF-TOKEN": Cookies.get("csrf_access_token") || "",
      }),
    }).then((response) => {
      if (response.status === 200) {
        callback();
      } else {
        console.error("Logout failed");
        console.error(response);
      }
    });
  },
};

export { authProvider };
