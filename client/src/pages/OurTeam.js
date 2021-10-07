import React, { lazy, Suspense, useEffect } from "react";
import Loader from "../components/Loader/Loader";
const Header = lazy(() => import("../components/OurTeam/Header"));
const Members = lazy(() => import("../components/OurTeam/Members"));
const WorkWithUs = lazy(() => import("../components/WorkWithUs/WorkWithUs"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
function OurTeam() {
  const operatingdiv = "Operating Member";
  const assistancediv = "Assistance Team";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <main className="our-team-main">
        <div className="teamDiv">
          <header>
            <Header />
          </header>
          <div className="member operatingdiv">
            <h2>
              Leading Team
              <hr className="mid-hr" />
            </h2>
            <Members post={operatingdiv} />
          </div>
          <div className="member assitancediv">
            <h2>
              Operating Team
              <hr className="mid-hr" />
            </h2>
            <Members post={assistancediv} />
          </div>
        </div>
      </main>
      <WorkWithUs />
      <Footer />
    </Suspense>
  );
}

export default OurTeam;
