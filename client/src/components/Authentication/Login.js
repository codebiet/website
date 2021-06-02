import React, { useContext, useEffect, useState, useRef, lazy } from "react";
import { AuthContext, InfoContext } from "../../state/Store";
import {
  loginUser,
  clearMsgs,
  recoverUser,
} from "../../state/auth/authActions";
import {
  generateError,
  clearEverything,
  generateWarning,
} from "../../state/info/infoActions";
import loginImage from "../assets/login.svg";
import lock from "../assets/lock.svg";
import mail from "../assets/mail.svg";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Redirect } from "react-router-dom";
import getPasswordResetLinkImage from "../assets/getPasswordResetLink.jpg";
// const Navbar = lazy(()=>import('../Navbar/Navbar'));
import Navbar from "../Navbar/Navbar";
export const useInput = ({ type, placeholder, id }) => {
  const [value, setValue] = useState("");
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      placeholder={placeholder}
      id={id}
    />
  );
  return [value, input];
};
const EmailForPasswordResetLink = ({ handleSubmit, setForgotPassword }) => {
  const [email, emailInput] = useInput({
    type: "email",
    placeholder: "Email",
    id: "forgotPassword-email",
  });
  return (
    <React.Fragment>
      <Navbar />
      <div className="register-main-container">
        <div className="img-container">
          <img
            className="register-image forgot-password-img"
            src={getPasswordResetLinkImage}
            alt=""
          />
        </div>
        <div className="form-container">
          <h1>ENTER YOUR EMAIL</h1>
          <form onSubmit={(e) => handleSubmit(e, email)} className="login-form">
            <div className="input-container">
              <label htmlFor="forgotPassword-email">Email:</label>
              {emailInput}
              <img src={mail} alt="" />
            </div>
            <div className="button-container">
              <button type="submit">GET THE LINK</button>
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
                <div onClick={(e) => setForgotPassword(false)}>Login Here</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
const Login = (props) => {
  //Context
  const auth = useContext(AuthContext);
  const info = useContext(InfoContext);
  console.log(auth.state);
  //form values, useInput is the custom hook imported from register component
  const [email, emailInput] = useInput({
    type: "email",
    placeholder: "Email",
    id: "login-email",
  });
  const [password, passwordInput] = useInput({
    type: "password",
    placeholder: "Password",
    id: "login-password",
  });
  //used to clear warning and info logs when the component is unmounted;
  useEffect(() => {
    const clearLogs = () => {
      auth.dispatch(clearMsgs);
      if (!info.state.success) info.dispatch(clearEverything());
    };
    return () => clearLogs();
  }, []);
  //used to get to know when user forgot the password and render component to get the user email to send reset link
  const [forgotPassword, setForgotPassword] = useState(false);
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
  const handleForgotPassword = (e, emailValue) => {
    console.log("Is handle Forgot Password also run");
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailValue)
      info.dispatch(
        generateWarning(
          "Please enter your registered Email to get the verification link."
        )
      );
    else if (!re.test(emailValue))
      info.dispatch(generateError("Please Enter a valid Email address"));
    else {
      recoverUser(auth.dispatch, { email: emailValue });
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
          {!forgotPassword && (
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
                      <label htmlFor="login-email">Email:</label>
                      {emailInput}
                      <img src={mail} alt="" />
                    </div>
                    <div className="input-container">
                      <label htmlFor="login-password">Password:</label>
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
                        <span style={{fontSize:"1rem"}}>Not Registered?</span>
                        <Link className="link" to="/register" style={{fontSize:"1rem"}}>
                          Join Us
                        </Link>
                      </div>
                      <div className="forget-password-container">
                        <div onClick={(e) => setForgotPassword(true)} style={{fontSize:"1rem",fontWeight:"700"}}>
                          Forgot Password?
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </React.Fragment>
          )}
          {forgotPassword && (
            <EmailForPasswordResetLink
              handleSubmit={handleForgotPassword}
              setForgotPassword={setForgotPassword}
            />
          )}
        </React.Fragment>
      )}
      {auth.state.userLoggingIn && <Loader />}
    </React.Fragment>
  );
};

export default Login;
