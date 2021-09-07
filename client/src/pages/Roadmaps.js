import React, { lazy, Suspense, useEffect } from "react";
import Loader from "../components/Loader/Loader";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const Roadmap = lazy(() => import("../components/Roadmaps/roadmap"));
const MainPage = lazy(() => import("../components/Roadmaps/MainPage"));

function Roadmaps() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <Roadmap />
      {/* <MainPage /> */}
      <Footer />
    </Suspense>
  );
}

export default Roadmaps;
