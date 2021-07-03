
const AccountLayout = () => import(/* webpackChunkName: "account" */ "@/pages/Account/Layout.vue")
const AccountSettingInformation = () => import(/* webpackChunkName: "account" */ "@/pages/Account/SettingInformation.vue")
const AccountSettingPassword = () => import(/* webpackChunkName: "account" */ "@/pages/Account/SettingPassword.vue")

export default [
  {
    path: "account",
    component: AccountLayout,
    redirect: "account/information",
    children: [
      {
        path: "information", 
        name: "account-setting-information", 
        component: AccountSettingInformation
      },
      {
        path: "password", 
        name: "account-setting-password", 
        component: AccountSettingPassword
      },
    ]
  }
]