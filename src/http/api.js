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
  return axios.patch(`documents/${docId}`, formData);
}

export function apiFindDocument(keyword = "") {
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

export function apiGetListTypeHak() {
  return axios.get("documents/type-hak");
}

export function apiPostSubmission(data) {
  return axios.post("documents/submit", data);
}

export function apiPostLogsDocuments(data) {
  return axios.post("documents/logs", data);
}

export function apiGetCheckSchedule(date, type) {
  return axios.get(`delivery/check-schedule?schedule=${date}&type=${type}`);
}

export function apiUpdateDeliverDocument(document_id, body) {
  return axios.patch(`documents/deliver/${document_id}`, body);
}

export function apiGetSubmissionList(keyword, page, page_size) {
  let queryKeyword = keyword ? `&keyword=${keyword}` : "";
  return axios.get(
    `documents/submission/list?page=${page}&page_size=${page_size}${queryKeyword}`
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

export function apiGetAllCourier() {
  return axios.get("users/courier");
}

//#endregion

//#region Delivery
export function apiRequestDeliveryServices(body = {}) {
  return axios.post(`delivery/request`, body);
}

export function apiGetDeliveryDetail(id) {
  return axios.get(`delivery/${id}`);
}

export function apiGetListDeliveryServices(page = 1, pageSize = 5) {
  return axios.get(`delivery?page=${page}&page_size=${pageSize}`);
}

export function apiPostAssignCourier(courier_id, delivery_id) {
  return axios.post("delivery/assign-courier", {
    courier: courier_id,
    delivery_id: delivery_id
  });
}

export function apiPostDeliveryLogs(formBody) {
  return axios.post("delivery/logs", formBody);
}
//#endregion

//#region Roles
export function apiGetRoles() {
  return axios.get("roles");
}
//#endregion
