import { lazy } from "react";

const AddRoadmap = lazy(() => import("./AddRoadmap"));
const roadmapRoutes = [

  {
    path: "/admin/roadmaps/add",
    name: "Add Roadmap",
    sidebarVisible: true,
    Component: AddRoadmap,
  },
];

export default roadmapRoutes;
