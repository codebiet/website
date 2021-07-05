import {lazy} from "react";
// import Home from "./Home.js";
// import AddAdmin from "./AddAdmin.js";
const Home = lazy(() => import("./Home"));
const AddAdmin = lazy(() => import("./AddAdmin"));
const homeRoutes = [
  {
    path: "/admin",
    name: "View Admins",
    sidebarVisible: true,
    Component: Home,
  },
  {
    path: "/admin/addAdmin",
    name: "Add Admin",
    sidebarVisible: true,
    Component: AddAdmin,
  },
];

export default homeRoutes;
