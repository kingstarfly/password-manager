export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://pwm4010.herokuapp.com"
    : "http://localhost:8080";
