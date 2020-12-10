import axios from "./axios";

export function apiPostLogin({ email: email, password: password }) {
  return axios.post(`auth/login`, { email: email, password: password });
}

export function apiPostSignup({
  emai: email,
  password: password,
  full_name: full_name
}) {
  return axios.post(`auth/register`, {
    email,
    password,
    full_name
  });
}

export function apiPostDocument(formData) {
  return axios.post(`documents`, formData);
}

export function apiPostFile(formData) {
  return axios.post(`files`, formData);
}

export function apiGetListDocument() {
  return axios.get(`documents`);
}

export function apiGetServices() {
  return axios.get(`services`);
}
