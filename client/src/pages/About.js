import React, { lazy,Suspense } from "react";
const AboutCode = lazy(() => import("../components/About/aboutCode"));

const Mission = lazy(() => import("../components/Mission/mission"));
const Vision = lazy(() => import("../components/Vision/vision"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
import Loader from "../components/Loader/Loader";
function About() {
  return (
    <Suspense fallback={<Loader />}>
    <div className="App">
      <div>
        <Nav />
        <div className="this">
          <div className="about">
            <AboutCode />
            <Mission />
            <Vision />
          </div>
        </div>
        <Footer />
      </div>
    </div>
    </Suspense>
  );
}

export default About;
