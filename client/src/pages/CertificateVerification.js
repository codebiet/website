import React, { lazy, Suspense, useEffect } from "react";
import Loader from "../components/Loader/Loader";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const CertificateVerification = lazy(() =>
  import("../components/CertificateVerification/CertificateVerification")
);

export default (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <CertificateVerification {...props} />
      <Footer />
    </Suspense>
  );
};
