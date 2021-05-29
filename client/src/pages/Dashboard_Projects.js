import React, { lazy, Suspense } from "react";
// const Dashboard_Projects = lazy(() =>
//   import("../components/Dashboard_Projects/Projects")
// );
import Dashboard_Projects from "../components/Dashboard_Projects/Projects";
// import Loader from "../components/Loader/Loader";
export default (props) => {
  return (
    // <Suspense fallback={<Loader />}>
      <Dashboard_Projects {...props} />
    // </Suspense>
  );
};
