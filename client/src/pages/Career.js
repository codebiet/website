import React, { lazy, Suspense, useEffect } from "react";
import Loader from "../components/Loader/Loader";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const Hero = lazy(() => import("../components/Career/Hero"));
const YourLifeAt = lazy(() => import("../components/Career/YourLifeAt"));
const JobOpenings = lazy(() => import("../components/Career/JobOpenings"));
const RecruitmentProcess = lazy(() =>
  import("../components/Career/RecruitmentProcess")
);
function Career() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <main className="career-main-container">
        <Hero />
        <YourLifeAt />
        <JobOpenings />
        <RecruitmentProcess />
      </main>
      <Footer />
    </Suspense>
  );
}

export default Career;
