import React, { lazy, Suspense } from "react";
import error from "../components/assets/error.svg";
import Loader from "../components/Loader/Loader";
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
// import Nav from "../components/Navbar/Nav";
// import Footer from "../components/Footer/Footer";
function Error404() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <div>
          <Nav />
          <div className="this">
            <div className="error404">
              <div className="erro404Inner" style={{margin:"2rem auto 4rem auto"}}>
                <img src={error} alt="404 error"></img>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}

export default Error404;
