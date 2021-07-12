import React from "react";
import { Link } from "react-router-dom";
const NavbarForLogin = () => {
  return (
    <React.Fragment>
      <Link to="/">
        <nav className="nav-bar">
          <img
            className="code-img"
            src="https://club-of-developers.s3.ap-south-1.amazonaws.com/codeLogo.png"
            alt=""
          />
        </nav>
      </Link>
    </React.Fragment>
  );
};
export default NavbarForLogin;
