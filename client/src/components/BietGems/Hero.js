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
              BIET Jhansi is one of the top engineering colleges under AKTU and
              students of our college always outshine by placing in top
              companies or by getting top ranks in GATE Exams. We are a family of
              more than 450 members and everyone’s contribution for this club is
              invaluable.We all have a spirit to make a difference and follow a
              common tradition of peer encouragement . Here we have listed all
              the proud member’s profiles and we always welcome others to be a
              part of our Club.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
