import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./DashboardSidebar";
import DashboardHeaderNav from "./DashboardHeaderNav";
import { AuthContext } from "../../../state/Store";
import { Redirect, useLocation } from "react-router-dom";
import Loader from "../../Loader/Loader";
const Dashboard = ({ routes, profileImg, ...props }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (auth.state.userLoaded) {
      //since app loads user information from backend when it is rendered for the first time
      setLoading(false);
      if (!auth.state.userLoggedIn || !auth.state.isAdmin) setRedirect(true);
    } else {
      setLoading(true);
    }
  }, [auth.state.userLoaded, auth.state.userLoggedIn]);
  return (
    <>
      {redirect ? (
        <Redirect
          to={{ pathname: "/login", state: { from: location.pathname } }}
        />
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="wrapper dashboard-main-wrapper">
              <Sidebar
                bgColor="white"
                activeColor="info"
                profileImg={profileImg}
                routes={routes}
              />
              <div className="main-panel dashboard-main-panel">
                <DashboardHeaderNav {...props} />
                <div className="content">{props.children}</div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Dashboard;
