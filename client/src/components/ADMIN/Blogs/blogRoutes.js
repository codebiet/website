import Suggestions from "./Suggestions";
const eventRoutes = [
  {
    path: "/admin/blogs/suggestions",
    name: "Suggestions",
    sidebarVisible: true,
    Component: Suggestions,
  },
  {
    path: "/admin/blogs",
    name: "Blogs",
    sidebarVisible: true,
    Component: <></>,
  },
  {
    path: "/admin/blogs/write/",
    name: "Write a blog",
    sidebarVisible: true,
    Component: <></>,
  },
  {
    path: "/admin/blogs/update/:url",
    name: "Update Blog",
    sidebarVisible: false,
    Component: <></>,
  },
];

export default eventRoutes;
