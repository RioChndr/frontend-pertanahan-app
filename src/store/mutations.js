import "es6-promise/auto";

export default {
  setDocumentDetail(state, payload) {
    state.detailDocument = payload;
  },
  setServices(state, payload) {
    state.services.push(...payload);
  }
};
