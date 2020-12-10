import axios from "axios";
import router from "../router/index";
const development = "http://localhost:4000/api/";
const production = "https://damp-reef-43427.herokuapp.com/";
const baseUrl =
  process.env.NODE_ENV === "production" ? production : development;

const instance = axios.create({
  baseURL: baseUrl
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem(process.env.VUE_APP_TOKEN_STORAGE);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      router.push("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
