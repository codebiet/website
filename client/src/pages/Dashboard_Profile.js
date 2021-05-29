import React, { lazy, Suspense } from "react";
// const Dashboard_Profile = lazy(() =>
//   import("../components/Dashboard_Profile/Dashboard")
// );
// import Loader from "../components/Loader/Loader";
import Dashboard_Profile from "../components/Dashboard_Profile/Dashboard";
export default (props) => {
  return (
    // <Suspense fallback={<Loader />}>
      <Dashboard_Profile {...props} />
    // </Suspense>
  );
};
