import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../state/Store";
import Navbar from "../Navbar/Navbar";
const Dashboard = (props) => {
  const auth = useContext(AuthContext);
  console.log(auth.state);
  return (
    <React.Fragment>
      {auth.state.userLoggedIn && auth.state.emailVerified ? (
        <React.Fragment>
          <Navbar />
          <div className="main-container">
            <h1>Welcome to dashboard</h1>
          </div>
        </React.Fragment>
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: "/dashboard" } }} />
      )}
    </React.Fragment>
  );
};
export default Dashboard;
