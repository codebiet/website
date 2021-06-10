import React, { lazy, Suspense, useEffect } from "react";
// const Dashboard_Projects = lazy(() =>
//   import("../components/Dashboard_Projects/Projects")
// );
import Dashboard_Projects from "../components/Dashboard_Projects/Projects";
// import Loader from "../components/Loader/Loader";
export default (props) => {
  useEffect(() => {
    window.scrollTo(0,0);
  },[])
  return (
    // <Suspense fallback={<Loader />}>
      <Dashboard_Projects {...props} />
    // </Suspense>
  );
};
