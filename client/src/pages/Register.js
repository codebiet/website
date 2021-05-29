import React, { lazy, Suspense } from "react";
// const Register = lazy(() => import("../components/Authentication/Register"));
import Register from "../components/Authentication/Register";
// import Loader from "../components/Loader/Loader";
export default (props) => {
  return (
    // <Suspense fallback={<Loader />}>
      <Register {...props}/>
    // </Suspense>
  );
};
