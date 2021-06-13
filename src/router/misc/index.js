// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";

export default [
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
]