import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Store, { AuthContext, InfoContext } from "../state/Store";
import { logOutUser } from "../state/auth/authActions";
import { Redirect } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import "./styles/theme.scss";
import SentVerifyEmail from "./SentVerifyEmail";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import Toaster from "./Toaster";
const Logout = () => {
  const auth = useContext(AuthContext);
  useEffect(() => {
    logOutUser(auth.dispatch);
  });
  return <Redirect to="/login" />;
};
function App() {
  const auth = useContext(AuthContext);
  const info = useContext(InfoContext);
  // useEffect(() => {
  //   loadUser(auth.dispatch, auth.state);
  // }, [auth.state.userLoggedIn, loadUser]);

  return (
    // <Store>
    <React.Fragment>
      <Router>
        <Switch>
          {/* <Route exact={true} path="/login" render={props => <SigninPage {...props} />} /> */}
          <Route
            exact={true}
            path="/register"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact={true}
            path="/sentVerifyEmail"
            render={(props) => <SentVerifyEmail {...props} />}
          />
          <Route
            exact={true}
            path="/login"
            render={(props) => <Login {...props} />}
          />
          <Route exact={true} path="/logout" render={(props) => <Logout />} />
          <Route
            exact={true}
            path="/"
            render={(props) => <Home {...props} />}
          />
          <Route
            exact={true}
            path="/dashboard"
            render={(props) => <Dashboard {...props} />}
          />
          <Route
            exact={true}
            path="/forgotPassword"
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            exact={true}
            path="/pageNotFound"
            render={() => <h1>Error 404: Page not found!</h1>}
          />
          <Route
            exact={true}
            path="/internalServerError"
            render={() => <h1>Status-Code 500: Internal Server Error!</h1>}
          />
        </Switch>
      </Router>
      {info.state.error &&
        ReactDOM.createPortal(
          <Toaster body={info.state.error} failure />,
          document.getElementById("info-portal")
        )}
      {info.state.warning &&
        ReactDOM.createPortal(
          <Toaster body={info.state.warning} info />,
          document.getElementById("info-portal")
        )}
      {info.state.success &&
        ReactDOM.createPortal(
          <Toaster body={info.state.success} success />,
          document.getElementById("info-portal")
        )}
    </React.Fragment>
    // </Store>
  );
}
function AppWithStore() {
  return (
    <Store>
      <App />
    </Store>
  );
}

export default AppWithStore;
