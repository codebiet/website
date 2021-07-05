import React, { lazy, Suspense, useEffect } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
// const Main = lazy(() => import("../components/BlogsIndividual/Main"));
import Main from "../components/BlogsIndividual/Main";
import Loader from "../components/Loader/Loader";
function BlogsIndividual(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <Main {...props} />
      <Footer />
    </Suspense>
  );
}

export default BlogsIndividual;
