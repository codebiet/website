import React, { lazy, Suspense } from "react";
// const ForgotPassword = lazy(() =>
//   import("../components/Authentication/ForgotPassword")
// );
import ForgotPassword from "../components/Authentication/ForgotPassword";
// import Loader from "../components/Loader/Loader";
export default (props) => {
  return (
    // <Suspense fallback={<Loader />}>
      <ForgotPassword {...props} />
    // </Suspense>
  );
};
