import React, { lazy, Suspense, useEffect, useState } from "react";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
const Content = lazy(() => import("../components/UserProfile/Content"));
const Header = lazy(() => import("../components/UserProfile/Header"));
import axios from "axios";
// import Nav from "../components/Navbar/Nav";
// import Footer from "../components/Footer/Footer";
// import MainDetails from "../components/UserProfile/Content";
// import Header from "../components/UserProfile/Header";
import Loader from "../components/Loader/Loader";

function UserProfile(props) {
  // console.log(props);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(props.match.params.id);
    axios
      .get(`/api/gems/${props.match.params.id}`)
      .then((res) => {
        setUserData(res.data.gems);
        // console.log(res.data.gems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Nav />
      <main>
        {userData && <Header user={userData} />}
        {userData && <Content user={userData} />}
      </main>
      <Footer />
    </Suspense>
  );
}

export default UserProfile;
