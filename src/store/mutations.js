import "es6-promise/auto";

export default {
  setDocumentDetail(state, payload) {
    state.detailDocument = payload;
  },

  setServices(state, payload) {
    state.services = [];
    state.services.push(...payload);
  },

  setListUsers(state, payload) {
    state.users = payload;
  },

  setListUsersEmpty(state) {
    state.users = [];
  },

  setUserPagination(state, payload) {
    state.userPagintaion = {};
    state.userPagintaion = payload;
  },

  setListRequest(state, payload) {
    state.documents = [];
    state.documents = payload;
  }
};
