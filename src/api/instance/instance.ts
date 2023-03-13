import axios from "axios";
import { getCookie } from "../../cookie/cookies";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_SERVER,
  headers: { Authorization: getCookie("authorization") },
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("authorization");
    if (getCookie("authorization")) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
