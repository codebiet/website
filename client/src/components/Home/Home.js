import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/Store";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Hero from "./Hero";
import WhatWeDo from "./WhatWeDo";
import Events from "./Events";
import Blogs from "./Blogs";
import Community from "./Community";
import Team from "./Team";
import Testimonials from "./Testimonials";
import AOS from "aos";
import Newsletter from "./Newsletter";
import Faqs from "./Faqs";
const Home = (props) => {
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      <main className="main-container-home">
        <Hero />
        <WhatWeDo />
        <Events />
        <Blogs />
        <Community />
        <Team />
        <Testimonials />
        <Newsletter />
        <Faqs />
      </main>
    </React.Fragment>
  );
};
export default Home;
