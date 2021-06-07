import React, { lazy, Suspense } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const Event_Individual = lazy(() =>
  import("../components/EventDetails/event_details")
);
import Loader from "../components/Loader/Loader";
const Event_Details = (props) => {
  return <Suspense fallback={<Loader />}>
      <Nav />
      <Event_Individual {...props} />
      <Footer />
  </Suspense>;
};
export default Event_Details;
