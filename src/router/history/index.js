// History
const HistoryLayout = () => import("@/pages/History/HistoryLayout.vue");
const HistoryList = () => import("@/pages/History/HistoryList.vue");

export default [
  {
    path: "/history",
    component: HistoryLayout,
    children: [{ path: "", component: HistoryList, name: "history.list" }]
  }
];
