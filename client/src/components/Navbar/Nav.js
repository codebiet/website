import React, { useState, useContext } from "react";
import { AuthContext } from "../../state/Store";
import { NavLink } from "react-router-dom";
import logo from "../assets/codelogo.png";
function Nav() {
  const auth = useContext(AuthContext);
  return (
    <div className="main-header-nav-container">
      <nav>
        {/* <!-- logo --> */}
        <div id="logo">
          <img src={logo} alt="code logo" />
        </div>
        {/* <!-- hamburger icon --> */}
        <label id="ham" for="toggle">
          <span className="slice"> </span>
          <span className="slice"> </span>
          <span className="slice"> </span>
        </label>
        <input type="checkbox" name="" id="toggle" />
        {/* <!-- navigation menu --> */}
        <div id="menu">
          <ul className="nav">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="#">
                Resources{" "}
                <img src="https://img.icons8.com/metro/26/000000/sort-down.png" />
              </NavLink>
              <div>
                <div className="nav-column">
                  {/* <!-- <h3>Resources</h3> --> */}
                  <ul>
                    <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Articles
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#team">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Our Team
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Club Activities
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Projects
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Achievements
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Event Gallery
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <NavLink to="#">
                Actions{" "}
                <img src="https://img.icons8.com/metro/26/000000/sort-down.png" />
              </NavLink>
              <div>
                <div className="nav-column">
                  <ul>
                    <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Work with Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Give Suggestions
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Discussion Forum
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/verifyCertificate">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Certificate Verification
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Report a Bug ?
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
          </ul>
          {!auth.state.userLoggedIn && (
            <ul className="cta-bar" style={{ margin: "1rem 0" }}>
              <li>
                <NavLink
                  to="/login"
                  className="cta cta-1"
                  style={{ color: "#ec7c2d" }}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="cta cta-2"
                  style={{ color: "white" }}
                >
                  Join Now
                </NavLink>
              </li>
            </ul>
          )}
          {auth.state.userLoggedIn && (
            <NavLink to="/dashboard" className="nav-user-container">
              <img
                className="avtar-img"
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt=""
              />
              <span>{auth.state.userName}</span>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
