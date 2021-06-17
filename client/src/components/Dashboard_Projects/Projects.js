import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../state/Store";
import Loader from "../Loader/Loader";
import axios from 'axios';
import DemoNavbar from "../Dashboard_Profile/DashboardHeaderNav";
import Sidebar from "../Dashboard_Profile/DashboardSidebar";
import Footer from "../Dashboard_Profile/DashboardFooter";
const Competitions = (props) => {
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
                    <h1 className="text-muted">You haven't done any projects with us yet.</h1>
                </div>
              </div>
              <Footer fluid />
              {loading && <Loader />}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: "/user-projects" } }} />
      )}
    </React.Fragment>
  );
};
export default Competitions;
