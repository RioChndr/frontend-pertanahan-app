// Setting Pages
const SettingLayout = () => import("@/pages/Setting/SettingLayout.vue");
const SettingUsers = () => import("@/pages/Setting/SettingUsers.vue");
const SettingServices = () => import("@/pages/Setting/SettingServices.vue");
const SettingServicesCreate = () => import("@/pages/Setting/SettingServicesCreate.vue");

export default [{
  path: "/setting",
  component: SettingLayout,
  children: [
    { path: "users", name: "users", component: SettingUsers },
    {
      path: "services",
      name: "services",
      component: SettingServices
    },
    {
      path: "services/create",
      name: "services.create",
      component: SettingServicesCreate
    },
    {
      path: "services/edit/:id",
      name: "services.edit",
      component: SettingServicesCreate
    }
  ]
}]