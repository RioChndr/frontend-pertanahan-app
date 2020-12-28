import "es6-promise/auto";

export default {
  userInfo: JSON.parse(localStorage.getItem(process.env.VUE_APP_USER_INFO)),

  services: [],

  loadingOverlay: false,

  users: [],
  userPagintaion: null,

  //#region Document
  detailDocument: {},
  documents: [],
  documentPagination: 0,
  //#endregion

  //#region Misc
  displayModalDetailHistory: false,
  detailModalDDetailHistory: null
  //#endregion
};
