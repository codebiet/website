import React, { useEffect, useContext, useRef, useState } from "react";
import axios from "axios";
import { InfoContext, AuthContext } from "../../state/Store";
import "regenerator-runtime/runtime";
import {
  generateError,
  generateSuccess,
  clearEverything,
} from "../../state/info/infoActions";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
import Loader from "../Loader/Loader";
import setPasswordImage from "../assets/setPassword.jpg";
import lock from "../assets/lock.svg";
import Navbar from "../Navbar/Navbar";
import { useInput } from "./Register";

const SetPassword = (props) => {
  const params = queryString.parse(props.location.search);
  const info = useContext(InfoContext);
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");
  //form values, useInput is the custom hook imported from register component
  const [password, passwordInput] = useInput({
    type: "password",
    placeholder: "Password",
    id: "setPassword-password",
  });
  const [confirmPassword, confirmPasswordInput] = useInput({
    type: "password",
    placeholder: "Confirm Password",
    id: "setPassword-confirmPassword",
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
  //handles form submit
  //===============================================================================
  const handleSubmit = (e) => {
    info.dispatch(clearEverything());
    if (confirmPassword && password) {
      if (password == confirmPassword) {
        setLoading(true);
        axios
          .post(
            `/post/setPassword?id=${params.id}`,
            {
              password,
              confirmPassword,
            }
          )
          .then((res) => {
            setLoading(false);
            if (res.data && res.data.msg == "success") {
              info.dispatch(
                generateSuccess("Password set successfully! You can login now.")
              );
              setRedirectTo("/login");
            } else info.dispatch(generateError("Something went wrong!"));
          })
          .catch((err) => {
            setLoading(false);
            if (err.response) {
              if (err.response.status == 500)
                setRedirectTo("/internalServerError");
              else {
                if (err.response.data && err.response.data.errorMsg) {
                  info.dispatch(generateError(err.response.data.errorMsg));
                } else {
                  info.dispatch(generateError("Something went wrong!"));
                }
              }
            } else {
              info.dispatch(
                generateError("Something went wrong, Please try again!")
              );
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
      {auth.state.userLoggedIn && props.history.goBack()}
      {loading && <Loader />}
      {redirectTo && <Redirect to={redirectTo} />}
      {!loading && !redirectTo && (
        <React.Fragment>
          <Navbar />
          <div className="register-main-container">
            <div className="img-container">
              <img className="register-image" src={setPasswordImage} alt="" />
            </div>
            <div className="form-container">
              <h1>SET YOUR PASSWORD</h1>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-container">
                  <label for="setPassword-password">
                    Password:
                  </label>
                  {passwordInput}
                  <img src={lock} alt="" />
                </div>
                <div className="input-container">
                  <label
                    for="setPassword-confirmPassword"
                  >
                    ConfirmPassword:
                  </label>
                  {confirmPasswordInput}
                  <img src={lock} alt="" />
                </div>
                <div className="button-container">
                  <button type="submit">SET PASSWORD</button>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SetPassword;
