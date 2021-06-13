// Auth pages
const AuthLayout = () => import("@/pages/Auth/AuthLayout.vue");
const AuthLoginLayout = () => import("@/pages/Auth/AuthLoginLayout.vue");
const AuthSignupLayout = () => import("@/pages/Auth/AuthSignupLayout.vue");

export default [
  {
    path: "/auth",
    component: AuthLayout,
    redirect: "/auth/login",
    children: [
      {
        path: "login",
        name: "login",
        component: AuthLoginLayout
      },
      {
        path: "signup",
        name: "signup",
        component: AuthSignupLayout
      }
    ]
  }
]