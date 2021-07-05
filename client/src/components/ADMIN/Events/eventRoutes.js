import {lazy} from "react";
// import Events from "./Events";
// import AddEvents from "./AddEvents";
// import UpdateEvent from "./UpdateEvent";
// import EventRegistrations from "./EventRegistrations";
const Events = lazy(() => import("./Events"));
const AddEvents = lazy(() => import("./AddEvents"));
const UpdateEvent = lazy(() => import("./UpdateEvent"));
const EventRegistrations = lazy(() => import("./EventRegistrations"));
const eventRoutes = [
  {
    path: "/admin/events",
    name: "Events",
    sidebarVisible: true,
    Component: Events,
  },
  {
    path: "/admin/events/add",
    name: "Add Events",
    sidebarVisible: true,
    Component: AddEvents,
  },
  {
    path: "/admin/events/update/:id",
    name: "Update Events",
    sidebarVisible: false,
    Component: UpdateEvent,
  },{
    path:"/admin/events/:id/registrations",
    name: "Registrations",
    sidebarVisible:false,
    Component: EventRegistrations
  }
];

export default eventRoutes;
