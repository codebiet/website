import React, { lazy, Suspense, useEffect } from "react";
// const Nav = lazy(() => import("../components/Navbar/Nav"));
// const Footer = lazy(() => import("../components/Footer/Footer"));
// const Event_Individual = lazy(() =>
//   import("../components/EventDetails/event_details")
// );
import Nav from "../components/Navbar/Nav";
import Footer from "../components/Footer/Footer";
import Event_Individual from "../components/EventDetails/event_details";
import Loader from "../components/Loader/Loader";
const Event_Details = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // <Suspense fallback={<Loader />}>
    <>
      <Nav />
      <Event_Individual {...props} />
      <Footer />
    </>
    // </Suspense>
  );
};
export default Event_Details;
