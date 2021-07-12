import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../state/Store";
import { NavLink } from "react-router-dom";
import logo from "../assets/codelogo.png";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
const ProfilePopover = () => {
  return (
    <UncontrolledPopover
      trigger="focus"
      placement="bottom"
      target="profile-popoper"
    >
      <PopoverHeader>
        <NavLink to="/dashboard">Go to Your Profile</NavLink>
      </PopoverHeader>
      <PopoverBody>
        <NavLink to="/logout">Logout</NavLink>
      </PopoverBody>
    </UncontrolledPopover>
  );
};
function Nav() {
  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.createRef();
  const resourcesRef = React.createRef();
  const actionsRef = React.createRef();
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const touchHandler = (e, refForToggle, refForRemove) => {
    e.preventDefault();
    // refForRemove.current.classList.remove("hovered");
    refForToggle.current.classList.toggle("hovered");
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) ref.current.classList.add("fixed-top");
      else ref.current.classList.remove("fixed-top");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <div className="main-header-nav-container" ref={ref}>
      <nav>
        {/* <!-- logo --> */}
        <NavLink to="/">
          <div id="logo">
            <img src={logo} alt="code logo" />
          </div>
        </NavLink>
        {/* <!-- hamburger icon --> */}
        <label
          className={isOpen ? "open" : "close"}
          id="ham"
          htmlFor="toggle"
          onClick={toggle}
        >
          <span className="slice"> </span>
          <span className="slice"> </span>
          <span className="slice"> </span>
        </label>
        <input type="checkbox" name="" id="toggle" />
        {/* <!-- navigation menu --> */}
        <div id="menu" className={isOpen ? "menu-open" : ""}>
          <ul className="nav">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li
              className="expand-on-hover"
              ref={resourcesRef}
              onTouchStart={(e) => touchHandler(e, resourcesRef, actionsRef)}
            >
              <button>
                Resources{" "}
                <img
                  src="https://img.icons8.com/metro/26/000000/sort-down.png"
                  alt=""
                />
              </button>
              <div className="expand">
                <div className="nav-column">
                  <ul>
                    <li>
                      <NavLink to="/blogs">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                          alt=""
                        />{" "}
                        Blogs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/ourTeam">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                          alt=""
                        />{" "}
                        CODE Family
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/events">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                          alt=""
                        />{" "}
                        Events
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/projects">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                          alt=""
                        />{" "}
                        Projects
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/discussion-forum">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                          alt=""
                        />{" "}
                        Discussion-forum
                      </NavLink>
                    </li>
                    {/* <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Achievements
                      </NavLink>
                    </li> */}
                    {/* <li>
                      <NavLink to="#">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                        />{" "}
                        Event Gallery
                      </NavLink>
                    </li> */}
                  </ul>
                </div>
              </div>
            </li>
            <li
              className="expand-on-hover"
              ref={actionsRef}
              onTouchStart={(e) => touchHandler(e, actionsRef, resourcesRef)}
            >
              <button>
                Actions{" "}
                <img
                  src="https://img.icons8.com/metro/26/000000/sort-down.png"
                  alt=""
                />
              </button>
              <div className="expand">
                <div className="nav-column">
                  <ul>
                    <li>
                      <NavLink to="/suggestions">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                          alt=""
                        />{" "}
                        Write a Blog
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/careers">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                          alt=""
                        />{" "}
                        Work with Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                          alt=""
                        />{" "}
                        Give Suggestions
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/verifyCertificate">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                          alt=""
                        />{" "}
                        Certificate Verification
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact">
                        <img
                          src="https://img.icons8.com/metro/26/000000/sort-down.png"
                          className="elevated"
                          alt=""
                        />{" "}
                        Report a Bug ?
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/bietGems">BIET Gems</NavLink>
            </li>
            <li style={{ marginRight: "1rem" }}>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            {/* the below two for mobile view */}
            {auth.state.userLoggedIn && (
              <>
                <li className="profile-link">
                  <NavLink to="/dashobard">Profile</NavLink>
                </li>
                <li className="logout-link">
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              </>
            )}
          </ul>
          {!auth.state.userLoggedIn && (
            <ul className="cta-bar" style={{ margin: "1rem 0" }}>
              <li>
                <NavLink
                  to="/login"
                  className="cta cta-1 default-btn round-corner"
                  style={{ color: "#ec7c2d" }}
                >
                  Login
                </NavLink>
              </li>
              <li style={{ marginRight: "2rem" }}>
                <NavLink
                  to="/register"
                  className="cta cta-2 default-btn round-corner"
                  style={{ color: "white" }}
                >
                  Join Now
                </NavLink>
              </li>
            </ul>
          )}
          {/* for desktop view */}
          {auth.state.userLoggedIn && (
            <>
              <button
                id="profile-popoper"
                className="nav-user-container"
                style={{ marginRight: "1rem" }}
              >
                <img className="avtar-img" src={auth.state.profileImg} alt="" />
                <span>{auth.state.userName}</span>
              </button>
              <ProfilePopover />
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
