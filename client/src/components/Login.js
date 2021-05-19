import React, { useContext, useEffect, useRef } from "react";
import { AuthContext, InfoContext } from "../state/Store";
import { loginUser, clearMsgs, recoverUser } from "../state/auth/authActions";
import {
  generateError,
  clearEverything,
  generateWarning,
} from "../state/info/infoActions";
import { useInput } from "./Register";
import loginImage from "./assets/login.svg";
import lock from "./assets/lock.svg";
import mail from "./assets/mail.svg";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./Loader";
import { Redirect } from "react-router-dom";
const Login = (props) => {
  //Context
  const auth = useContext(AuthContext);
  const info = useContext(InfoContext);
  console.log(auth.state);
  //form values, useInput is the custom hook imported from register component
  const [email, emailInput] = useInput({ type: "email", placeholder: "Email" });
  const [password, passwordInput] = useInput({
    type: "password",
    placeholder: "Password",
  });
  //used to get to know when component updates due to user writing in different fields
  //===============================================================================
  const mounted = useRef();
  //when user starts typing in form fields, messages shown due to user errors gets invisible, when component mounts
  // there are no messages visible to the user buffered due to previous actions
  useEffect(() => {
    const clearLogs = () => {
      auth.dispatch(clearMsgs());
      info.dispatch(clearEverything());
    };
    if (!mounted.current) {
      mounted.current = true;
      auth.dispatch(clearMsgs()); //when this components mounts their should not be any messages related to login/register, may be buffered due to previous actions
    } else clearLogs(); //when user writes in form fields, messages shown due to user errors are now not visible
  }, [email, password]);
  //when there is an info from backend, so it to user
  //==============================================================================
  useEffect(() => {
    if (auth.state.loginError)
      info.dispatch(generateError(auth.state.loginError));
  }, [auth.state.loginError]);
  //handles form submit
  //===============================================================================
  const handleSubmit = (e) => {
    if (email && password) {
      loginUser(auth.dispatch, {
        email,
        password,
      });
    } else {
      info.dispatch(generateError("Please fill in all the fields!"));
    }
    e.preventDefault();
  };
  //handles forgot password click
  const handleForgotPassword = (e) => {
    console.log("handle Forgot Password is also run");
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email)
      info.dispatch(
        generateWarning(
          "Please enter your registered Email to get the verification link."
        )
      );
    else if (!re.test(email))
      info.dispatch(generateError("Please Enter a valid Email address"));
    else {
      recoverUser(auth.dispatch, { email });
    }
    e.preventDefault();
  };
  //handles Messages while recovering password
  useEffect(() => {
    if (auth.state.recoverError)
      info.dispatch(generateError(auth.state.recoverError));
    if (auth.state.recoverMsg)
      info.dispatch(generateWarning(auth.state.recoverMsg));
  }, [auth.state.recoverError, auth.state.recoverMsg]);
  //view and authentication
  //===============================================================================
  return (
    <React.Fragment>
      {auth.state.userLoggedIn ? (
        //redirection
        <React.Fragment>
          {auth.state.emailVerified ? (
            <Redirect
              to={
                (props.location.state && props.location.state.from) ||
                "/dashboard"
              }
            />
          ) : (
            <React.Fragment>
              {props.location.state ? (
                <Redirect
                  to={{
                    pathname: "/sentVerifyEmail",
                    state: { from: props.location.state.from },
                  }}
                />
              ) : (
                <Redirect to="/sentVerifyEmail" />
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        // the above logic is for redirection, due to authentication parameters
        <React.Fragment>
          <Navbar />
          <div className="register-main-container">
            <div className="img-container">
              <img className="register-image" src={loginImage} alt="" />
            </div>
            <div className="form-container">
              <h1>LOGIN TO CODE</h1>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-container">
                  {emailInput}
                  <img src={mail} alt="" />
                </div>
                <div className="input-container">
                  {passwordInput}
                  <img src={lock} alt="" />
                </div>
                <div className="button-container">
                  <button type="submit">LOGIN</button>
                </div>
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        display: "inline-block",
                        marginRight: ".5rem",
                      }}
                    >
                      Not Registered?
                    </span>
                    <Link className="link" to="/register">
                      Join Us
                    </Link>
                  </div>
                  <div className="forget-password-container">
                    <div onClick={(e) => handleForgotPassword(e)}>
                      Forgot Password?
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
      {auth.state.userLoggingIn && <Loader />}
    </React.Fragment>
  );
};

export default Login;
