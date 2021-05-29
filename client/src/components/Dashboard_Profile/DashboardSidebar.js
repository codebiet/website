import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

var ps;

const routes = [
  {
    path: "/dashboard",
    name: "EDIT PROFILE",
    icon: "nc-icon nc-bank",
  },
  {
    path: "/articles",
    name: "ARTICLES",
    icon: "nc-icon nc-diamond",
  },
  {
    path: "/user-projects",
    name: "PROJECTS",
    icon: "nc-icon nc-pin-3",
  },
  {
    path: "/competitions",
    name: "COMPETITIONS",
    icon: "nc-icon nc-bell-55",
  },
  {
    path: "/resume",
    name: "RESUME",
    icon: "nc-icon nc-single-02",
  },
  {
    path: "/logout",
    name: "LOGOUT",
    icon: "nc-icon nc-tile-56",
  },
];
function Sidebar(props) {
  const sidebar = React.useRef();
  const location = useLocation();
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo p-5">
        {!props.profileImg && <AccountCircleIcon style={{ fontSize: "140" }} />}
        {props.profileImg && <img className="profile-img" src={props.profileImg} alt=""/>}
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {routes.map((route, key) => {
            return (
              <li
                className={location.pathname == route.path && "active"}
                key={key}
              >
                <NavLink
                  to={route.path}
                  className="btn btn-default "
                  activeClassName="active"
                >
                  <p>{route.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
