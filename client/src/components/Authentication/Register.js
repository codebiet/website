import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext, InfoContext } from "../../state/Store";
import { clearMsgs } from "../../state/auth/authActions";
import { clearEverything, generateError } from "../../state/info/infoActions";
import { signupUser } from "../../state/auth/authActions";
import registerImage from "../assets/register.svg";
// import lock from "../assets/lock.svg";
import mail from "../assets/mail.svg";
import user from "../assets/user.svg";
import briefcase from "../assets/briefcase.svg";
import Navbar from "../Navbar/Navbar";
import { Link, Redirect } from "react-router-dom";
import Loader from "../Loader/Loader";
// import "./register.scss";
//custom hook to use Input for different form fields
//================================================================================
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
//================================================================================
const Register = (props) => {
  //Context
  const auth = useContext(AuthContext);
  const info = useContext(InfoContext);
  //form values
  const [name, nameInput] = useInput({
    type: "text",
    placeholder: "Name",
    id: "register-name",
  });
  const [email, emailInput] = useInput({
    type: "email",
    placeholder: "Email",
    id: "register-email",
  });
  const [role, setRole] = useState("Student");
  //used to get to know when component updates due to user writing in different fields
  //===============================================================================
  const mounted = useRef();
  //when user starts typing in form fields, messages shown due to user errors gets invisible, when component mounts
  // there are no messages visible to the user buffered due to previous actions
  useEffect(() => {
    const clearLogs = () => {
      auth.dispatch(clearMsgs()); //clear errors buffered in auth state;
      info.dispatch(clearEverything()); //clears errors buffered in info state;
    };
    if (!mounted.current) {
      clearLogs(); //when this components mounts their should not be any messages show, may be buffered due to previous actions
      mounted.current = true;
    } else clearLogs(); //when user writes in form fields, messages shown due to user errors are now not visible
  }, [name, email]);
  //used to clear warning and info logs when the component is unmounted;
  useEffect(() => {
    const clearLogs = () => {
      auth.dispatch(clearMsgs);
      if (!info.state.success) info.dispatch(clearEverything());
    };
    return () => clearLogs();
  }, []);
  //when there is an info from backend, show it to user
  //==============================================================================
  useEffect(() => {
    if (auth.state.signupError) {
      info.dispatch(generateError(auth.state.signupError));
    }
  }, [auth.state.signupError]);
  //handles form submit
  //===============================================================================
  const handleSubmit = (e) => {
    if (name && email && role) {
      // if (password == confirmPassword)
      signupUser(auth.dispatch, {
        name,
        email,
        role,
      });
      // else {
      // info.dispatch(generateError("Passwords do not match!"));
      // }
    } else if (!name || !email || !role) {
      info.dispatch(generateError("Please fill in all the fields!"));
    }
    e.preventDefault();
  };
  //view
  //==================================================================================
  return (
    <React.Fragment>
      {auth.state.token && auth.state.emailVerified ? (
        <Redirect to="/dashboard" />
      ) : (
        <>
          {auth.state.redirectToVerifyEmail ? (
            <Redirect to="/sentVerifyEmail" />
          ) : (
            <React.Fragment>
              <Navbar />
              <div className="register-main-container">
                <div className="img-container">
                  <img className="register-image" src={registerImage} alt="" />
                </div>
                <div className="form-container">
                  <h1>REGISTRATION FORM</h1>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-container">
                      <label for="register-role">Role:</label>
                      <select
                        id="register-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="Professional">Professional</option>
                        <option value="Student">Student</option>
                      </select>
                      <img src={briefcase} alt="" />
                    </div>
                    <div className="input-container">
                      <label for="register-name">Name:</label>
                      {nameInput}
                      <img src={user} alt="" />
                    </div>
                    <div className="input-container">
                      <label for="register-email">Email:</label>
                      {emailInput}
                      <img src={mail} alt="" />
                    </div>
                    {/* <div className="input-container">
                  {passwordInput}
                  <img src={lock} alt="" />
                </div>
                <div className="input-container">
                  {confirmPasswordInput}
                  <img src={lock} alt="" />
                </div> */}
                    <div className="button-container">
                      <button type="submit">REGISTER</button>
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          display: "inline-block",
                          margin: "1rem .5rem 0 0",
                          width: "unset",
                          padding: 0,
                        }}
                      >
                        Already Registered?
                      </span>
                      <Link className="link" to="/login">
                        Login here
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </React.Fragment>
          )}
        </>
      )}
      {auth.state.userLoggingIn && <Loader />}
    </React.Fragment>
  );
};

export default Register;
