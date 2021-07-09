import { lazy } from "react";
// import Career from "./Career";
// import AddJobs from "./AddJobs";
// import UpdateJob from "./UpdateJob";
// import JobApplicatons from "./JobApplications";
const Career = lazy(() => import("./Career"));
const AddJobs = lazy(() => import("./AddJobs"));
const UpdateJob = lazy(() => import("./UpdateJob"));
const JobApplications = lazy(() => import("./JobApplications"));
const careerRoutes = [
  {
    path: "/admin/career",
    name: "Career",
    sidebarVisible: true,
    Component: Career,
  },
  {
    path: "/admin/jobs/add",
    name: "Add Jobs",
    sidebarVisible: true,
    Component: AddJobs,
  },
  {
    path: "/admin/jobs/update/:id",
    name: "Update Jobs",
    sidebarVisible: false,
    Component: UpdateJob,
  },
  {
    path: "/admin/jobs/:id/applications",
    name: "Applications",
    sidebarVisible: false,
    Component: JobApplications,
  },
];

export default careerRoutes;
