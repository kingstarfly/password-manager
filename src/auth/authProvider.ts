/**
 * This represents some generic auth provider API, like Firebase.
 */
const BASE_URL = "https://pwm4010.herokuapp.com";

const authProvider = {
  isAuthenticated: false,
  signin(email: string, password: string, callback: VoidFunction) {
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
        callback();
      } else {
        console.error("Login failed", response.status);
      }
    });
  },
  register(email: string, password: string, callback: VoidFunction) {
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
        callback();
      } else {
        console.error("Register failed", response.status);
      }
    });
  },
  signout(callback: VoidFunction) {
    authProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { authProvider };
