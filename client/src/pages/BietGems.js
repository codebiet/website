import React, { lazy, Suspense } from "react";
const Hero = lazy(() => import("../components/BietGems/Hero"));
const Card = lazy(() => import("../components/BietGems/Card"));
const Pagination = lazy(() => import("../components/BietGems/Pagination"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
import Loader from "../components/Loader/Loader";

const BietGems = (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <main className="biet-gems-main">
        <Hero />
        <Card />
        <Pagination {...props} />
      </main>
      <Footer />
    </Suspense>
  );
};
export default BietGems;
