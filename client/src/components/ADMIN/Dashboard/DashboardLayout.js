import React from "react";
import Sidebar from "./DashboardSidebar";
import DashboardHeaderNav from "./DashboardHeaderNav";
const Dashboard = ({ routes, profileImg, ...props }) => {
  return (
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
  );
};
export default Dashboard;
