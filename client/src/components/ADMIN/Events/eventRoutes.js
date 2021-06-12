import Events from "./Events";
import AddEvents from "./AddEvents";
const eventRoutes = [
  {
    path: "/admin/events",
    name: "Events",
    Component: Events,
  },
  {
    path: "/admin/events/add",
    name: "Add Events",
    Component: AddEvents,
  },
  {
    path: "/admin/events/update",
    name: "Update Events",
    Component: Events,
  },
  {
    path: "/admin/events/remove",
    name: "Remove Events",
    Component: Events,
  },
];

export default eventRoutes;