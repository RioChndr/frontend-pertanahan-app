// Setting Pages
const SubmissionLayout = () =>
  import("@/pages/Submissions/SubmissionLayout.vue");
const SubmissionDetail = () =>
  import("@/pages/Submissions/SubmissionDetail.vue");
const SubmissionList = () => import("@/pages/Submissions/SubmissionList.vue");

export default [
  {
    path: "/submissions",
    component: SubmissionLayout,
    children: [
      {
        path: "",
        name: "submission.list",
        component: SubmissionList
      },
      {
        path: "/detail",
        name: "submission.detail",
        component: SubmissionDetail
      }
    ]
  }
];
