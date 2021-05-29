import React, { lazy, Suspense } from "react";
// const Dashboard_Resume = lazy(() =>
//   import("../components/Resume/Resume")
// );
import Dashboard_Resume from "../components/Resume/Resume";
// import Loader from "../components/Loader/Loader";
export default (props) => {
  return (
    // <Suspense fallback={<Load/er />}>
      <Dashboard_Resume {...props} />
    // </Suspense>
  );
};
