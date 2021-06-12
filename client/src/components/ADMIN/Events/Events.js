import React from "react";
import eventRoutes from "./eventRoutes";
import DashboardLayout from "../Dashboard/DashboardLayout";
const Events = () => {
  return <DashboardLayout routes={eventRoutes}>
      <h1>All Events will be shown here.</h1>
  </DashboardLayout>;
};
export default Events;