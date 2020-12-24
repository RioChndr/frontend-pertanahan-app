import "es6-promise/auto";
import {
  apiGetDetailDocument,
  apiGetServices,
  apiPutDocument
} from "../http/api";

export default {
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

  //#region Document
  actionPutDocument({ commit, dispatch }, payload) {
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
  }
  //#endregionr
};
