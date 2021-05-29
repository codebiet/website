import React, { lazy } from "react";
import { Suspense } from "react";
// import Loader from "../components/Loader/Loader";
// const SentVerifyEmail = lazy(() =>
//   import("../components/Authentication/SentVerifyEmail")
// );
import SentVerifyEmail from "../components/Authentication/SentVerifyEmail";
export default (props) => {
  return (
    // <Suspense fallback={<Loader />}>
      <SentVerifyEmail {...props}/>
    // </Suspense>
  );
};
