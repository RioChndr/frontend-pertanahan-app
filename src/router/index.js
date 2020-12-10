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
router.beforeEach((to, from, next) => {
  if (to.name !== "login" && to.name !== "signup" && !token)
    next({ name: "login" });
  else if ((token && to.name === "login") || (token && to.name === "signup")) {
    next({ name: "request" });
  } else {
    next();
  }
});

export default router;
