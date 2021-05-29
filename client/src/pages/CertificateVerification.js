import React, { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader";
const CertificateVerification = lazy(() =>
  import("../components/CertificateVerification/CertificateVerification")
);

export default (props) => {
  return <Suspense fallback={<Loader />}>
    <CertificateVerification {...props} />
  </Suspense>;
};
