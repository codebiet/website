import React, { lazy, Suspense } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const HomeComponent = lazy(() => import("../components/Home/Home"));
import Loader from "../components/Loader/Loader";
function Home() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Nav />
        <HomeComponent />
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
