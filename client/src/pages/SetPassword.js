import React, { lazy, Suspense } from "react";
// import Loader from "../components/Loader/Loader";
// const SetPassword = lazy(() =>
//   import("../components/Authentication/SetPassword")
// );
import SetPassword from "../components/Authentication/SetPassword";
export default (props) => {
  return (
    // <Suspense fallback={<Loader />}>
      <SetPassword {...props} />
    // {/* </Suspense> */}
  );
};
