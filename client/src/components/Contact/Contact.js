import React, { useContext, useEffect, useState } from "react";
import { InfoContext } from "../../state/Store";
import axios from "axios";
import {
  clearEverything,
  generateError,
  generateWarning,
  generateSuccess,
} from "../../state/info/infoActions";
import Loader from "../Loader/Loader";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const info = useContext(InfoContext);
  useEffect(() => {
    if (info.state.error || info.state.warning || info.state.success)
      info.dispatch(clearEverything());
  }, [name, email, phoneNumber, msg]);
  useEffect(() => {
    //remove alerts from the store if there are any, from this page;
    return () => info.dispatch(clearEverything());
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneNumberRegex = /^[0-9]{10}/i;
    if (!name || !email || !phoneNumber || !msg) {
      return info.dispatch(
        generateError("You're required to fill in all the fields!")
      );
    } else if (!emailRegex.test(email)) {
      return info.dispatch(generateError("Invalid Email!"));
    } else if (
      phoneNumber.length < 10 ||
      phoneNumber.length > 10 ||
      !phoneNumberRegex.test(phoneNumber)
    ) {
      return info.dispatch(
        generateError(
          "Invalid Phone Number. Please Enter 10 digit phone Number!"
        )
      );
    } else if (msg.length < 30) {
      return info.dispatch(
        generateWarning("Message too Short! Atleast 50 characters Required!")
      );
    }
    setLoading(true);
    axios
      .post("/post/contact", { name, email, phoneNumber, msg })
      .then((res) => {
        setLoading(false);
        info.dispatch(
          generateSuccess(
            "Message Sent Successfully! You'll be hearing from us shortly."
          )
        );
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data && err.response.data.errorMsg)
          info.dispatch(generateError(err.response.data.errorMsg));
        else
          info.dispatch(
            generateError("Something went wrong, Please try again!")
          );
      });
  };
  return (
    <div className="contact-container">
      <section className="ContactSection">
        <div className="ContactDivs">
          <div className="contactDetails">
            <h2>Contact Details</h2>
            <div className="codeAddress">
              <i className="fas fa-globe icon"></i>
              <div className="Address-Content">
                <h4>Permanent Address</h4>
                <p>KochaBhawar BIET,Jhansi</p>
              </div>
            </div>
            <div className="codeAddress">
              <i className="fas fa-phone icon"></i>
              <div className="Address-Content">
                <h4>Call us</h4>
                <p>9811818802 , 0554-88885455</p>
              </div>
            </div>
            <div className="codeAddress">
              <i className="fas fa-envelope-open icon"></i>
              <div className="Address-Content">
                <h4>Mail us</h4>
                <p>gauti@123unplaced.com</p>
              </div>
            </div>
          </div>
          <div className="ContactForm">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              ></input>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
              ></input>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Contact number"
              ></input>
              <textarea
                placeholder="Type your message here*"
                className="textareaContactDetails"
                rows="4"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              ></textarea>
              <button type="submit " className="btn-hover color-4">
                Send message
              </button>
            </form>
          </div>
        </div>
        <br></br>
        <p className="Infotext">
          Don't worry, no spam here! Your information will only be used for
          C.O.D.E and Chrome related updates<br></br> and our emails are
          typically no more than 1-2 times a month. You can unsubscribe anytime.
        </p>
        <br></br>
        {loading && <Loader />}
      </section>
    </div>
  );
}

export default Contact;
