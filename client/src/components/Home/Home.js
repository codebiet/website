import React, { useContext, useEffect, lazy } from "react";
import { AuthContext } from "../../state/Store";
// import Hero from "./Hero";
// import WhatWeDo from "./WhatWeDo";
// import Events from "./Events";
// import Blogs from "./Blogs";
// import Community from "./Community";
// import Team from "./Team";
// import Testimonials from "./Testimonials";
// import Newsletter from "./Newsletter";
// import Faqs from "./Faqs";
// import TorchBearers from "./TorchBearers";
const Hero = lazy(() => import("./Hero"));
const WhatWeDo = lazy(() => import("./WhatWeDo"));
const Events = lazy(() => import("./Events"));
const Blogs = lazy(() => import("./Blogs"));
const Community = lazy(() => import("./Community"));
const Team = lazy(() => import("./Team"));
const Testimonials = lazy(() => import("./Testimonials"));
const Newsletter = lazy(() => import("./Newsletter"));
const Faqs = lazy(() => import("./Faqs"));
const TorchBearers = lazy(() => import("./TorchBearers"));
const Home = (props) => {
  const auth = useContext(AuthContext);
  //scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <main className="main-container-home">
        <Hero />
        <WhatWeDo />
        <Events />
        <Blogs />
        <Community />
        <Team />
        <TorchBearers />
        <Testimonials />
        <Newsletter />
        <Faqs />
      </main>
    </React.Fragment>
  );
};
export default Home;
