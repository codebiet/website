import React from "react";
import heroImg from "../assets/header.svg";

function Hero() {
  return (
    <div className="about-us-hero-container">
      <div className="banner">
        <div className="content">
          <div className="leader">
            <img src={heroImg} className="image" alt="" />
          </div>

          <div className="t">
            <h1>Meet our Gems!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus amet, porro unde nihil blanditiis harum corporis
              accusantium magnam nesciunt ad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
