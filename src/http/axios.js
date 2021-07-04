import axios from "axios";
import router from "../router/index";
import Vue from "vue";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(process.env.VUE_APP_TOKEN_STORAGE);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response){
      if (error.response.status === 401) {
        router.push("/auth/login");
      }
    } else if(error.request){
      let msgNoInternet = "Tidak ada koneksi internet, periksa koneksi anda"
      Vue.$toast.error(msgNoInternet, { timeout: false });
      return Promise.reject(msgNoInternet)
    }
    return Promise.reject(error);
  }
);

export default instance;
