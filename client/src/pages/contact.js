import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { InfoContext } from "../state/Store";
import axios from "axios";
import {
  clearEverything,
  generateError,
  generateWarning,
  generateSuccess,
} from "../state/info/infoActions";
const Social = lazy(() => import("../components/Social/social"));
const Nav = lazy(() => import("../components/Navbar/Nav"));
const Footer = lazy(() => import("../components/Footer/Footer"));
import Loader from "../components/Loader/Loader";
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
    }else if(!emailRegex.test(email)){
      return info.dispatch(generateError("Invalid Email!"))
    }else if(phoneNumber.length < 10 || phoneNumber.length > 10 || !phoneNumberRegex.test(phoneNumber)){
      return info.dispatch(generateError("Invalid Phone Number. Please Enter 10 digit phone Number!"));
    }
    else if (msg.length < 30) {
      return info.dispatch(generateWarning("Message too Short! Atleast 50 characters Required!"));
    }
    setLoading(true);
    axios
      .post("/post/contact",{name,email,phoneNumber,msg})
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
    <Suspense fallback={<Loader />}>
      <div className="App">
        <div>
          <Nav />
          <div className="this">
            <div className="contact">
              <section className="newsletterSection">
                <div className="newsLetter">
                  <div className="newLetterInputDiv">
                    <div className="contactDetails">
                      <div className="contactDetailsInner">
                        <h1>Contact Details</h1>
                        <div className="contact">
                          <div className="icon-container">
                            <i className="fas fa-globe"></i>
                          </div>
                          <div className="content-container">
                            <h2>Permanent Address</h2>
                            <p>KochaBhawar BIET,Jhansi</p>
                          </div>
                        </div>
                        <div className="contact">
                          <div className="icon-container">
                            <i className="fas fa-phone"></i>
                          </div>
                          <div className="content-container">
                            <h2>Call us</h2>
                            <p>05248-252341 , 9511123923</p>
                          </div>
                        </div>
                        <div className="contact">
                          <div className="icon-container">
                            <i className="fas fa-envelope-open"></i>
                          </div>
                          <div className="content-container">
                            <h2>Mail us</h2>
                            <p className="email">gauti@123unplaced.com </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contact-form-container">
                      <form onSubmit={(e) => handleSubmit(e)}>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input
                          type="text"
                          placeholder="Contact no."
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        ></input>
                        <textarea
                          type="text"
                          placeholder="Type your message here*"
                          className="textareaContactDetails"
                          value={msg}
                          onChange={(e) => setMsg(e.target.value)}
                        ></textarea>
                        <button type="submit">SEND MESSAGE</button>
                      </form>
                    </div>
                  </div>
                  <br></br>
                  <span>
                    Don't worry, no spam here! Your information will only be
                    used for C.O.D.E and Chrome related updates<br></br> and our
                    emails are typically no more than 1-2 times a month. You can
                    unsubscribe anytime.
                  </span>
                  <br></br>
                </div>
              </section>
              <Social />
            </div>
          </div>
          <Footer />
        </div>
        {loading && <Loader />}
      </div>
    </Suspense>
  );
}

export default Contact;
