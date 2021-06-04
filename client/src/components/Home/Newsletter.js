import React, { useState, useEffect, useContext } from "react";
import {InfoContext} from "../../state/Store";
import {generateSuccess, generateWarning} from "../../state/info/infoActions";
import axios from "axios";
import AOS from "aos";
const Newsletter = (props) => {
  const [email, setEmail] = useState("");
  const info = useContext(InfoContext);
  useEffect(()=>{
      AOS.init();
      AOS.refresh();
  },[]);
  const handleSubmit = (e) => {
      e.preventDefault();
      const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!email || !emailRegex.test(email)) return info.dispatch(generateWarning("Please provide a valid email Address!"));
      info.dispatch(generateSuccess("This is not connected to backend yet!"));
  }
  return (
    <section
      className="subscribe-area pb-50 pt-70"
      data-aos="zoom-out-down"
      data-aos-delay="100"
      data-aos-once={true}
      data-aos-duration="800"
    >
      <div className="container">
        <div className="row subcontainer">
          <div className="col-md-4">
            <div className="subscribe-text mb-15">
              <h2>Subscribe Now!</h2>
              <span>GET ALL THE LATEST UPDATES</span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="subscribe-wrapper subscribe2-wrapper mb-15">
              <div className="subscribe-form">
                <form onSubmit={(e) => handleSubmit(e)} style={{maxWidth:"unset"}}>
                  <input
                    placeholder="enter your email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit">
                    Count Me in <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;