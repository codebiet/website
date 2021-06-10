import React, { lazy, Suspense, useEffect } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const Content = lazy(() => import("../components/UserProfile/Content"));
const Header = lazy(() => import("../components/UserProfile/Header"));
// import Nav from "../components/Navbar/Nav";
// import Footer from "../components/Footer/Footer";
// import MainDetails from "../components/UserProfile/Content";
// import Header from "../components/UserProfile/Header";
import Loader from "../components/Loader/Loader";
function UserProfile(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <main>
        <Header />
        <Content />
      </main>
      <Footer />
    </Suspense>
  );
}

export default UserProfile;
