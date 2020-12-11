import "es6-promise/auto";

export default {
  userInfo: JSON.parse(localStorage.getItem(process.env.VUE_APP_USER_INFO)),
  detailDocument: {},

  services: [],

  loadingOverlay: false
};
