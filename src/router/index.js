import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active"
});

const token = localStorage.getItem(process.env.VUE_APP_TOKEN_STORAGE);
let userInfo =
  JSON.parse(localStorage.getItem(process.env.VUE_APP_USER_INFO)) || null;

let roleId =
  userInfo === null ? null : userInfo && userInfo.role && userInfo.role.id;

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && to.name !== "signup" && !token)
    next({ name: "login" });
  else if ((token && to.name === "login") || (token && to.name === "signup")) {
    if ([5, 4].includes(roleId)) {
      next({ name: "dashboard" });
    } else if (roleId === 3) {
      next({ name: "request" });
    } else if ([6, 2].includes(roleId)) {
      next({ name: "delivery.list" });
    } else if (roleId === 1) {
      next({ name: "archive.list" });
    }
    next();
  } else if (to.path === "/" && [5, 4].includes(roleId)) {
    next({ name: "dashboard" });
  } else if (to.path === "/" && roleId === 3) {
    next({ name: "request" });
  } else if (to.path === "/" && [6, 2].includes(roleId)) {
    next({ name: "delivery.list" });
  } else if (to.path === "/" && roleId === 1) {
    next({ name: "archive.list" });
  } else {
    next();
  }
});

export default router;
