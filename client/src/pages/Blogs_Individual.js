import React, { lazy, Suspense } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const Card = lazy(() => import("../components/BlogsIndividual/Card"));
const Main = lazy(() => import("../components/BlogsIndividual/Main"));
import Loader from "../components/Loader/Loader";
function BlogsIndividual() {
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <Main />
      <Card />
      <Footer />
    </Suspense>
  );
}

export default BlogsIndividual;
