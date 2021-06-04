import React, { lazy, Suspense } from "react";

import svg from "../components/assets/SVG.svg";

const ComingEvents = lazy(() =>
  import("../components/ComingEvents/comingEvents")
);
const WhatWeDo = lazy(() => import("../components/WhatWeDo/whatWeDo"));
const Testimonials = lazy(() =>
  import("../components/Testimonials/testimonials")
);
const Newsletter = lazy(() => import("../components/Newsletter/newsletter"));
const Social = lazy(() => import("../components/Social/social"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
// import ComingEvents from "../components/ComingEvents/comingEvents";
// import WhatWeDo from "../components/WhatWeDo/whatWeDo";
// import Testimonials from "../components/Testimonials/testimonials";
// import Newsletter from "../components/Newsletter/newsletter";
// import Social from "../components/Social/social";
// import Nav from "../components/Navbar/Nav";
// import Footer from "../components/Footer/Footer";
// import { Suspense } from "react";
const HomeComponent = lazy(() => import('../components/Home/Home'));
// import HomeComponent from "../components/Home/Home";
import Loader from "../components/Loader/Loader";
function Home() {
  return (
    <>
      <Suspense fallback={<Loader />}>
      {/* <div className="App">
        <div>
          <Nav />
          <div className="this">
            <div className="heroheader">
              <div className="introDiv">
                <div className="divContent">
                  <h1>Learn ,Build, Innovate</h1>
                  <p>Yahn koi 2-3 line ki tagline buss isse jyda nahi</p>
                  <div className="loginButtonDiv">
                    <button className="getStarted">Webinars</button>
                    <button className="getProjects">Projects</button>
                  </div>
                </div>
                <div className="introSVG">
                  <div className="svg">
                    <img src={svg} className="finalSVG" alt="introImage" />
                  </div>
                </div>
              </div>
              <section className="vision">
                <h2>Our Vision</h2>
                <p>
                  "As the Computer Science demand advances, Learner's
                  expectations grow. With C.O.D.E guidance, you can give
                  yourself the best experience, wherever they are."
                </p>
              </section>
              <WhatWeDo />
              <section>
                <ComingEvents />
              </section>

              <Testimonials />
              <Newsletter />
              <Social />
            </div>
          </div>
          <Footer />
        </div>
      </div> */}
      <Nav/>
      <HomeComponent />
      <Footer />
      </Suspense>
    </>
  );
}

export default Home;
