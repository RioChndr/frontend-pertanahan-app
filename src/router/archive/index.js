const ArchiveLayout = () =>
  import(/* webpackChunkName: "archive" */ "@/pages/Archive/ArchiveLayout.vue");
const ArchiveList = () =>
  import(/* webpackChunkName: "archive" */ "@/pages/Archive/ArchiveList.vue");
const ArchiveDetail = () =>
  import(/* webpackChunkName: "archive" */ "@/pages/Archive/ArchiveDetail.vue");

export default [
  {
    path: "archive",
    component: ArchiveLayout,
    children: [
      {
        path: "",
        name: "archive.list",
        component: ArchiveList
      },
      {
        path: "detail/:id",
        name: "archive.detail",
        component: ArchiveDetail
      }
    ]
  }
];
