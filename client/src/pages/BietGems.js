import React, { lazy, Suspense, useEffect } from "react";
const Hero = lazy(() => import("../components/BietGems/Hero"));
// const GemCard = lazy(() => import("../components/BietGems/GemsCard"));
const GemCard = lazy(() => import("../components/BietGems/Card"));
const Pagination = lazy(() => import("../components/Pagination/Pagination"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
import Loader from "../components/Loader/Loader";

const BietGems = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <main className="biet-gems-main">
        <Hero />
        <GemCard />
      </main>
      <Footer />
    </Suspense>
  );
};
export default BietGems;
