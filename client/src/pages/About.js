import React, { lazy, Suspense } from "react";
const AboutCode = lazy(() => import("../components/About/aboutCode"));

const Mission = lazy(() => import("../components/Mission/mission"));
const Vision = lazy(() => import("../components/Vision/vision"));
const Values = lazy(() => import("../components/Values/Values"));
const Founder = lazy(() => import("../components/Founder/founder"));
const Executives = lazy(() => import("../components/Executives/Executives"));
const WorkWithUs = lazy(() => import("../components/WorkWithUs/WorkWithUs"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
import Loader from "../components/Loader/Loader";
function About() {
  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Nav />
        <main className="about-container-main">
          <div className="about">
            <AboutCode />
            <Mission />
            <Vision />
            <Values />
            <Founder />
            <Executives />
          </div>
          <WorkWithUs />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export default About;
