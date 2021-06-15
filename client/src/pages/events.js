import React, { lazy } from "react";
import { Suspense } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
import Loader from "../components/Loader/Loader";
const EventsMain = lazy(() => import("../components/Events/EventMainTab"));
// const eventsData = lazy(() => import("../components/EventCard/eventsData"));
function Events() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <div>
          <Nav />
          <EventsMain />
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}

export default Events;
