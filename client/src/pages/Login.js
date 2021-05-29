import React, { lazy,Suspense } from "react";
// const Login = lazy(() => import("../components/Authentication/Login"));
import Login from "../components/Authentication/Login";
// import Loader from "../components/Loader/Loader";
export default (props) => {
  return (
    // <Suspense fallback={<Loader />}>
      <Login {...props} />
    // </Suspense>
  );
};
