import React, { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const Discussion = lazy(() => import("../components/Discussion/Discussion"));
function DiscussionPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <Discussion />
      <Footer />
    </Suspense>
  );
}

export default DiscussionPage;
