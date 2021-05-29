import React, { useState, useContext } from "react";
import { AuthContext } from "../../state/Store";
import { NavLink, useHistory } from "react-router-dom";
import contact from "../assets/contactSVG.svg";
import project from "../assets/projectSVG.svg";
import events from "../assets/eventSVG.svg";
import about from "../assets/aboutSVG.svg";
function Nav() {
  let history = useHistory();
  const auth = useContext(AuthContext);
  let [showSideNav, setSideNav] = useState(false);
  let close = function (event) {
    if (event.target.id) {
      history.push(event.target.id);
      setSideNav(!showSideNav);
    }
  };
  return (
    <div>
      <div className="header">
        <div className="hamburger">
          <button onClick={() => setSideNav(!showSideNav)}>&#9776;</button>
        </div>

        {!showSideNav && (
          <div className="logo">
            <NavLink to="/">C.O.D.E</NavLink>
          </div>
        )}

        {showSideNav && (
          <div className="sideNav">
            <div className="close" onClick={() => setSideNav(!showSideNav)}>
              X
            </div>
            <NavLink
              to="/"
              className="logoSideNav"
              onClick={() => setSideNav(!showSideNav)}
            >
              <h1>C.O.D.E</h1>
              <p>Learn Build Innovate </p>
            </NavLink>
            <ul className="sidebar" onClick={close}>
              <li>
                <div className="navTabs" id="projects">
                  Projects
                </div>
              </li>
              <li>
                <div className="navTabs" id="events">
                  Events
                </div>
              </li>

              <li>
                <div className="navTabs" id="about">
                  About Us
                </div>
              </li>
              <li>
                <div className="navTabs" id="blogs">
                  Blogs
                </div>
              </li>
              <li>
                <div className="navTabs" id="contact">
                  Contact
                </div>
              </li>
            </ul>
          </div>
        )}
        <div className="navItems">
          <ul>
            <li>
              <NavLink to="/projects">
                <img src={project} alt="project-icon" className="icons"></img>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/events">
                <img src={events} alt="event-icon" className="icons"></img>{" "}
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Blogs</NavLink>
            </li>

            <li>
              <NavLink to="/about">
                <img src={about} alt="about-icon" className="icons"></img>About
                Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">
                <img src={contact} alt="contact-icon" className="icons"></img>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div></div>

        {auth.state.userLoggedIn ? (
          <NavLink to="/dashboard" className="loginButton">
            User
          </NavLink>
        ) : (
          <NavLink className="loginButton" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Nav;
