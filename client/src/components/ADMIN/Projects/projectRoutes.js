import { lazy } from "react";
// import Projects from "./AddProject";
const Projects = lazy(() => import("./AddProject"));
const projectRoutes = [
  {
    path: "/admin/projects/add",
    name: "Add Project",
    sidebarVisible: true,
    Component: Projects,
  },
];

export default projectRoutes;
