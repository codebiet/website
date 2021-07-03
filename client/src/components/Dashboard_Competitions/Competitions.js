import React, { useContext, lazy } from "react";
import { AuthContext } from "../../state/Store";
// import DemoNavbar from "../Dashboard_Profile/DashboardHeaderNav";
// import Sidebar from "../Dashboard_Profile/DashboardSidebar";
// import Footer from "../Dashboard_Profile/DashboardFooter";
const DemoNavbar = lazy(() =>
  import("../Dashboard_Profile/DashboardHeaderNav")
);
const Sidebar = lazy(() => import("../Dashboard_Profile/DashboardSidebar"));
const Footer = lazy(() => import("../Dashboard_Profile/DashboardFooter"));
const Competitions = (props) => {
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
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: "/competitions" } }}
        />
      )}
    </React.Fragment>
  );
};
export default Competitions;
