import { lazy } from "react";
const Feedback = lazy(() => import("./Feedback"));

export default [
  {
    path: "/admin/feedbacks",
    name: "Feedback",
    sidebarVisible: true,
    Component: Feedback,
  },
];
