import "es6-promise/auto";
import {
  apiGetDetailDocument,
  apiGetListUsers,
  apiGetServices,
  apiPutDocument,
  apiPatchResetPassword,
  apiPatchDisableUser,
  apiPatchEnableUser,
  apiGetAllDoneRequest
} from "../http/api";

export default {
  //#region Service
  apiGetServices({ commit }) {
    return new Promise((resolve, reject) => {
      apiGetServices()
        .then(result => {
          resolve(result);
          commit("setServices", result.data.message.services);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  //#endregion

  //#region Document
  actionPutDocument({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      apiPutDocument(payload.doc_id, payload.form)
        .then(result => {
          dispatch("apiGetDetailDocument", payload);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  apiGetDetailDocument({ commit }, payload) {
    const { doc_id } = payload;
    return new Promise((resolve, reject) => {
      apiGetDetailDocument(doc_id)
        .then(result => {
          commit("setDocumentDetail", result.data.document);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  apiGetAllRequest({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiGetAllDoneRequest(payload)
        .then(result => {
          commit("setListRequest", result.data.documents.results);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  //#endregion

  //#region User
  apiListUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiGetListUsers(payload.page, payload.pageSize)
        .then(result => {
          commit("setListUsers", result.data.users.results);
          commit("setUserPagination", result.data.users.total);
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  apiResetPassword({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      apiPatchResetPassword(payload.id)
        .then(result => {
          dispatch("apiListUser", payload);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  apiLockUser({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      apiPatchDisableUser(payload.id)
        .then(result => {
          dispatch("apiListUser", payload);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  apiUnlockUser({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      apiPatchEnableUser(payload.id)
        .then(result => {
          dispatch("apiListUser", payload);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  //#endregion
};
