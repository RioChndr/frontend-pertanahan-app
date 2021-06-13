import Notify from "vue-notifyjs";
import SideBar from "@/components/SidebarPlugin";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import "es6-promise/auto";

// vue toastification
import Toast, { POSITION, TYPE } from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
  position: POSITION.BOTTOM_RIGHT,
  toastDefaults: {
    [TYPE.ERROR]: {
      timeout: 3000
    },
    [TYPE.SUCCESS]: {
      timeout: 2000
    }
  }
};

// Vue Inifinite Scroll
import infiniteScroll from "vue-infinite-scroll";

//css assets
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/sass/paper-dashboard.scss";
import "@/assets/css/themify-icons.css";

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
    Vue.use(SideBar);
    Vue.use(Notify);
    Vue.use(Toast, options);
    Vue.use(infiniteScroll);
  }
};
