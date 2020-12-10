import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";

// Auth pages
const AuthLayout = () => import("@/pages/Auth/AuthLayout.vue");
const AuthLoginLayout = () => import("@/pages/Auth/AuthLoginLayout.vue");
const AuthSignupLayout = () => import("@/pages/Auth/AuthSignupLayout.vue");

// Document Pages
const DocumentLayout = () => import("@/pages/Documents/DocumentLayout.vue");
const DocumentCreate = () => import("@/pages/Documents/DocumentCreate.vue");
const DocumenList = () => import("@/pages/Documents/DocumentList.vue");
const DocumentUploadFile = () => import("@/pages/Documents/DocumentUploadFile");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      },
      {
        path: "upload-document",
        name: "upload-document",
        component: DocumentLayout,
        redirect: "upload-document/list",
        children: [
          { path: "list", name: "list", component: DocumenList },
          { path: "create", name: "create", component: DocumentCreate },
          {
            path: "upload-file/:id",
            name: "upload-file",
            component: DocumentUploadFile
          }
        ]
      }
    ]
  },
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
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
    function view(name) {
      var res= require('../components/Dashboard/Views/' + name + '.vue');
      return res;
    };
**/

export default routes;
