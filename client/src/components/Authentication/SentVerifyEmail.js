import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../state/Store";
import { Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import otpSvg from "../assets/otp.svg";
import Loader from "../Loader/Loader";
import { sendVerificationEmail } from "../../state/auth/authActions";
const SentVerifyEmail = (props) => {
  const auth = useContext(AuthContext);
  const [seconds, setSeconds] = useState(59);
  const [msg, setMsg] = useState(
    "A verification link has been sent to your registered Email Address. Click on the link to verify your Email Address."
  );
  useEffect(() => {
    let timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [seconds]);
  useEffect(() => {
    axios
      .get("/api/sendVerificationEmail")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  //reseting counter after sending the link again
  useEffect(() => {
    if (!auth.state.sendingVerificationEmail) setSeconds(59);
  }, [auth.state.sendingVerificationEmail]);
  const handleClick = () => {
    sendVerificationEmail(auth.dispatch);
    setMsg(
      "A verification link has been sent to your registered Email Again. Follow the link to verify your email address"
    );
  };
  return (
    <React.Fragment>
      {auth.state.token ? (
        auth.state.emailVerified ? (
          <Redirect to="/" />
        ) : (
          <React.Fragment>
            <Navbar />
            <div className="register-main-container">
              <div className="img-container">
                <img className="register-image" src={otpSvg} alt="" />
              </div>
              <div className="form-container">
                <h1
                  style={{
                    textDecoration: "none",
                    marginBottom: "1.5rem",
                    color: "#f98500",
                  }}
                >
                  {msg}
                </h1>
                <form
                  style={{ width: "100%",maxWidth:"unset",padding:0 }}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="button-container">
                    {seconds > 0 ? (
                      <button
                        style={{
                          background: "rgba(255, 155, 33,.5)",
                          color: "grey",
                        }}
                        disabled
                      >
                        RESEND IN {seconds}
                      </button>
                    ) : (
                      <button onClick={handleClick}>SEND AGAIN!</button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </React.Fragment>
        )
      ) : (
        <Redirect to="/login" />
      )}
      {auth.state.sendingVerificationEmail && <Loader />}
    </React.Fragment>
  );
};
export default SentVerifyEmail;
