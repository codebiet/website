import React, { useContext } from "react";
import { AuthContext } from "../../state/Store";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const Home = (props) => {
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      {auth.state.userLoggedIn ? (
        auth.state.emailVerified ? (
          <React.Fragment>
            <Navbar />
            <div className="main-container">
              <h1>Welcome to Home</h1>
            </div>
          </React.Fragment>
        ) : (
          <Redirect to="/sentVerifyEmail" />
        )
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )}
    </React.Fragment>
  );
};
export default Home;
