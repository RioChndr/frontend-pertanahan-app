import axios from "./axios";

//#region Auth
export function apiPostLogin({ email: email, password: password }) {
  return axios.post(`auth/login`, { email: email, password: password });
}

export function apiPostSignup({
  email: email,
  password: password,
  full_name: full_name,
  role_id: role_id = 3
}) {
  return axios.post(`auth/register`, {
    email,
    password,
    full_name,
    role_id
  });
}

export function apiPostVerifyAuthGoogle(id_token) {
  return axios.post(`auth/verify`, {
    id_token
  });
}
//#endregion

//#region Document
export function apiPostDocument(formData) {
  return axios.post(`documents`, formData);
}

export function apiGetListDocument() {
  return axios.get(`documents`);
}

export function apiGetDetailDocument(docId) {
  return axios.get(`documents/${docId}`);
}

export function apiPrintDocument(docId) {
  return axios.get(`documents/print/${docId}`);
}

export function apiPutDocument(docId, formData = {}) {
  return axios.put(`documents/${docId}`, formData);
}

export function apiFindDocument(keyword = null) {
  return axios.get(`documents/find?keyword=${keyword}`);
}

export function apiGetAllDoneRequest({
  page: page = 0,
  pageSize: pageSize = 10,
  keyword: keyword = ""
}) {
  return axios.get(
    `documents/admin/all?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
  );
}

//#endregion

//#region Service
export function apiGetServices() {
  return axios.get(`services`);
}

export function apiGetService(serviceId) {
  return axios.get(`services/${serviceId}`);
}

export function apiPostService(formData = {}) {
  return axios.post(`services`, formData);
}

export function apiPatchService(serviceId = null, formData = {}) {
  return axios.patch(`services/${serviceId}`, formData);
}

export function apiRemoveService(serviceId) {
  return axios.delete(`services/${serviceId}`);
}
//#endregion

//#region Files
export function apiPostFile(formData) {
  return axios.post(`files`, formData);
}

export function apiRemoveFile(fileId) {
  return axios.delete(`files/${fileId}`);
}
//#endregion

//#region Users
export function apiGetListUsers(page = 0, pageSize = 5) {
  return axios.get(`users?page=${page}&pageSize=${pageSize}`);
}

export function apiPatchDisableUser(userId = null) {
  return axios.patch(`users/disable/${userId}`);
}

export function apiPatchEnableUser(userId = null) {
  return axios.patch(`users/enable/${userId}`);
}

export function apiPatchResetPassword(userId = null) {
  return axios.patch(`users/reset-password/${userId}`);
}

//#endregion
