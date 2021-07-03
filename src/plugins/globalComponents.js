import { FormGroupInput, Card, DropDown, Button } from "../components/index";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

// Vue Select
import vSelect from "vue-select";

import LoadingOverlay from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { getStatusArchive, getStatusSubmission } from "../helpers/utils";

// import Filter

const GlobalComponents = {
  install(Vue) {
    Vue.component("fg-input", FormGroupInput);
    Vue.component("drop-down", DropDown);
    Vue.component("card", Card);
    Vue.component("p-button", Button);
    Vue.component("v-select", vSelect);
    Vue.component("v-loading", LoadingOverlay);
    Vue.filter("getStatusValue", value => {
      if (value) {
        return getStatusSubmission(value);
      }
      return "Belum Diajukan";
    });

    Vue.filter("getArchiveStatus", value => {
      if (value) {
        return getStatusArchive(value);
      }
      return "Belum Diajukan";
    });
  }
};

export default GlobalComponents;
