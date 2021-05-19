import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../state/Store";
import codeImage from "./assets/codeLogo.png";
import {logOutUser} from '../state/auth/authActions';
import "./styles/Navbar.scss";
const Navbar = () => {
  const auth = useContext(AuthContext);
  const handleLogout = () => {
    logOutUser(auth.dispatch);

  }
  return (
    <React.Fragment>
      <nav className="nav-bar">
        <img className="code-img" src={codeImage} alt="" />
        <div className="join-us-hamburger-container">
          {auth.state.userLoggedIn ? (
            <button className="join-us" onClick={()=>handleLogout()}>LOGOUT</button>
          ) : (
            <Link to="/register" className="join-us">
              JOIN US
            </Link>
          )}
          <button className="hamburger-container">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
