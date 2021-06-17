import React, { lazy, useState, useEffect, useContext } from "react";
import { AuthContext, InfoContext } from "../../state/Store";
const Loader = lazy(() => import("../Loader/Loader"));
const DemoNavbar = lazy(() =>
  import("../Dashboard_Profile/DashboardHeaderNav")
);
const Sidebar = lazy(() => import("../Dashboard_Profile/DashboardSidebar"));
const Footer = lazy(() => import("../Dashboard_Profile/DashboardFooter"));
import { Redirect } from "react-router-dom";
const Articles = (props) => {
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      {auth.state.userLoggedIn && auth.state.emailVerified ? (
        <React.Fragment>
          <div className="wrapper dashboard-main-wrapper">
            <Sidebar
              bgColor="white"
              activeColor="info"
              profileImg={auth.state.profileImg}
            />
            <div className="main-panel dashboard-main-panel">
              <DemoNavbar {...props} />
              <div className="content">
                <div className="articles-container">
                  <h1 className="text-muted">Nothing to Show</h1>
                </div>
              </div>
              <Footer fluid />
              {loading && <Loader />}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: "/articles" } }} />
      )}
    </React.Fragment>
  );
};
export default Articles;
