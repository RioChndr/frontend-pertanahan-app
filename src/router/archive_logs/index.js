const ArchiveLogsLayout = () =>
  import(
    /* webpackChunkName: "archive_logs" */ "@/pages/ArchiveLogs/ArchiveLogsLayout.vue"
  );
const ArchiveLogsList = () =>
  import(
    /* webpackChunkName: "archive_logs" */ "@/pages/ArchiveLogs/ArchiveLogsList.vue"
  );
const ArchiveLogsDetail = () =>
  import(
    /* webpackChunkName: "archive_logs" */ "@/pages/ArchiveLogs/ArchiveLogsDetail.vue"
  );

export default [
  {
    path: "archive-logs",
    component: ArchiveLogsLayout,
    children: [
      {
        path: "",
        name: "archive.list",
        component: ArchiveLogsList
      },
      {
        path: "detail/:id",
        name: "archive.detail",
        component: ArchiveLogsDetail
      }
    ]
  }
];
