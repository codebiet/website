import Events from "./Events";
import AddEvents from "./AddEvents";
const eventRoutes = [
  {
    path: "/admin/events",
    name: "Events",
    sidebarVisible:true,
    Component: Events,
  },
  {
    path: "/admin/events/add",
    name: "Add Events",
    sidebarVisible:true,
    Component: AddEvents,
  },
  {
    path: "/admin/events/update",
    name: "Update Events",
    sidebarVisible:false,
    Component: Events,
  },
  {
    path: "/admin/events/remove",
    name: "Remove Events",
    sidebarVisible:false,
    Component: Events,
  },
];

export default eventRoutes;