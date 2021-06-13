import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Sidebar({ bgColor, activeColor, profileImg, routes }) {
  const sidebar = React.useRef();
  const location = useLocation();
  return (
    <div
      className="sidebar"
      data-color={bgColor}
      data-active-color={activeColor}
    >
      <div className="logo p-5">
        {!profileImg && <AccountCircleIcon style={{ fontSize: "140" }} />}
        {profileImg && <img className="profile-img" src={profileImg} alt="" />}
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {routes.map((route, key) => {
            return (
              <li
                className={location.pathname == route.path && "active"}
                key={key}
              >
                <Link
                  to={route.path}
                  className={(location.pathname == route.path || location.pathname == route.path+"/") ? "btn btn-default active" : "btn btn-default"}
                >
                  <p>{route.name}</p>
                </Link>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
