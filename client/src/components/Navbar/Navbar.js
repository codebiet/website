import React, { useContext, useState, useEffect,lazy } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../state/Store";
import { logOutUser } from "../../state/auth/authActions";
// const codeImage = lazy(()=>import("../assets/codeLogo.jpg"));
import codeImage from "../assets/code.jpeg";
const Navbar = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [showExtraInfoInNavbar, setShowExtraInfoInNavbar] = useState(false);
  useEffect(() => {
    if (
      location.pathname != "/login" &&
      location.pathname != "/register" &&
      location.pathname != "/setPassword" &&
      location.pathname != "/forgotPassword" &&
      location.pathname != "/sentVerifyEmail"
    ) {
      setShowExtraInfoInNavbar(true);
    }
  }, []);
  const handleLogout = () => {
    logOutUser(auth.dispatch);
  };
  return (
    <React.Fragment>
      <nav className="nav-bar">
        <img className="code-img" src={codeImage} alt="" />
        <div className="join-us-hamburger-container">
          {auth.state.userLoggedIn ? (
            <button className="join-us" onClick={() => handleLogout()}>
              LOGOUT
            </button>
          ) : showExtraInfoInNavbar ? (
            <Link to="/register" className="join-us">
              JOIN US
            </Link>
          ) : (
            location.pathname == "/regiser" && (
              <Link to="/login" className="join-us">
                LOGIN
              </Link>
            )
          )}
          {showExtraInfoInNavbar && (
            <button className="hamburger-container">
              <i className="fas fa-bars"></i>
            </button>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
