import React, { useEffect, useContext, useRef, useState } from "react";
import axios from "axios";
import { InfoContext, AuthContext } from "../../state/Store";
import "regenerator-runtime/runtime";
import {
  generateError,
  generateSuccess,
  clearEverything,
} from "../../state/info/infoActions";
import { Redirect, Link } from "react-router-dom";
import queryString from "query-string";
import Loader from "../Loader/Loader";
import forgotPasswordImage from "../assets/forgotPassword.png";
import lock from "../assets/lock.svg";
import Navbar from "../Navbar/Navbar";
import { useInput } from "./Register";

const forgotPassword = (props) => {
  const params = queryString.parse(props.location.search);
  const info = useContext(InfoContext);
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState("");
  //form values, useInput is the custom hook imported from register component
  const [password, passwordInput] = useInput({
    type: "password",
    placeholder: "Password",
    id: "forgotPassword-password",
  });
  const [confirmPassword, confirmPasswordInput] = useInput({
    type: "password",
    placeholder: "Confirm Password",
    id: "forgotPassword-confirmPassword",
  });
  //used to get to know when component updates due to user writing in different fields
  //===============================================================================
  const mounted = useRef();
  //when user starts typing in form fields, messages shown due to user errors gets invisible, when component mounts
  // there are no messages visible to the user buffered due to previous actions
  useEffect(() => {
    const clearLogs = () => {
      info.dispatch(clearEverything());
    };
    if (!mounted.current) {
      mounted.current = true;
      clearLogs(); //when this components mounts their should not be any messages show, may be buffered due to previous actions
    } else clearLogs(); //when user writes in form fields, messages shown due to user errors are now not visible
  }, [password, confirmPassword]);
  //utility to verify the link
  //==============================================================================
  const verifyResetLink = () => {
    const verificationLink = `/api/verifyResetPasswordLink?a=${params.a}&b=${params.b}`;
    return new Promise((resolve, reject) => {
      axios
        .get(verificationLink)
        .then((res) => {
          if (res.data.msg == "success") {
            resolve(200);
          } else {
            reject(400);
          }
        })
        .catch((err) => {
          if (err.response.status == 500) reject(500);
          else reject(400);
        });
    });
  };
  //verifying the visited link when component is mounted
  //=============================================================================
  useEffect(async () => {
    verifyResetLink()
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err == 500) setRedirectTo("/internalServerError");
        else setRedirectTo("/pageNotFound"); //invalid
      });
  }, []);
  //handles form submit
  //===============================================================================
  const handleSubmit = (e) => {
    info.dispatch(clearEverything());
    if (confirmPassword && password) {
      if (password == confirmPassword) {
        setLoading(true);
        axios
          .post(`/post/changePassword?a=${params.a}&b=${params.b}`, {
            password,
            confirmPassword,
          })
          .then((res) => {
            setLoading(false);
            if (res.data && res.data.msg == "success") {
              info.dispatch(
                generateSuccess(
                  "Password Change successfully! You can Login now."
                )
              );
              props.history.push("/login");
            } else info.dispatch(generateError("Something went wrong!"));
          })
          .catch((err) => {
            setLoading(false);
            if (err.response.status == 500)
              setRedirectTo("/internalServerError");
            else {
              if (err.response.data && err.response.data.errorMsg) {
                info.dispatch(generateError(err.response.data.errorMsg));
              } else if (err.response.data && err.response.data.error) {
                info.dispatch(generateError(err.response.data.error));
              } else {
                info.dispatch(generateError("Something went wrong!"));
              }
            }
          });
      } else {
        info.dispatch(generateError("Passwords don't match!"));
      }
    } else {
      info.dispatch(generateError("Please fill in all the fields!"));
    }
    e.preventDefault();
  };
  //view
  //================================================================================
  return (
    <React.Fragment>
      {loading && <Loader />}
      {redirectTo && <Redirect to={redirectTo} />}
      {!loading && !redirectTo && (
        <React.Fragment>
          <Navbar />
          <div className="register-main-container">
            <div className="img-container">
              <img
                className="register-image"
                src={forgotPasswordImage}
                alt=""
              />
            </div>
            <div className="form-container">
              <h1>RESET YOUR PASSWORD</h1>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-container">
                  <label for="forgotPassword-password">Password:</label>
                  {passwordInput}
                  <img src={lock} alt="" />
                </div>
                <div className="input-container">
                  <label for="forgotPassword-confirmPassword">
                    Confirm Password:
                  </label>
                  {confirmPasswordInput}
                  <img src={lock} alt="" />
                </div>
                <div className="button-container">
                  <button type="submit">CHANGE PASSWORD</button>
                </div>
                {!auth.state.userLoggedIn && (
                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span>Not Registered?</span>
                      <Link className="link" to="/register">
                        Join Us
                      </Link>
                    </div>
                    <div className="forget-password-container">
                      <Link className="link" to="/login">
                        Login Here
                      </Link>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default forgotPassword;
