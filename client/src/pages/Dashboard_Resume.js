import React, { lazy, Suspense, useEffect } from "react";
// const Dashboard_Resume = lazy(() =>
//   import("../components/Resume/Resume")
// );
import Dashboard_Resume from "../components/Resume/Resume";
// import Loader from "../components/Loader/Loader";
export default (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // <Suspense fallback={<Load/er />}>
    <Dashboard_Resume {...props} />
    // </Suspense>
  );
};
