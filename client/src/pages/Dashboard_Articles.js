import React, { lazy, Suspense, useEffect } from "react";
const Dashboard_Articles = lazy(() =>
  import("../components/Dashboard_Articles/Articles")
);
import Loader from "../components/Loader/Loader";
// import Dashboard_Articles from "../components/Dashboard_Articles/Articles";
export default (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Dashboard_Articles {...props} />
    </Suspense>
  );
};
