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
              companies or by getting top ranks in GATE Exams. Here we are
              sharing a list of some famous BIET Alumni who really made it big
              and made our college proud of them. It wouldn’t be possible to
              mention all the names here, but We’d be listing the names who are
              quite popular and really making a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
