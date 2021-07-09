import React, { lazy, Suspense, useEffect } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const Job_Individual = lazy(() =>
  import("../components/JobDetails/JobDetails")
);
import Loader from "../components/Loader/Loader";
const Job_Details = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <Job_Individual {...props} />
      <Footer />
    </Suspense>
  );
};
export default Job_Details;
