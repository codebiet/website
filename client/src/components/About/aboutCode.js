import React from "react";
import img from "../assets/about.svg";
function AboutCode() {
  return (
    <div className="aboutCODE">
      <section>
        <div className="aboutImage">
          <img src={img} alt="about-us" className="aboutImg"></img>
        </div>
        <div className="aboutHead">
          <h1 className="BlockHeading">
            About <span className="Headingspan">CODE</span>{" "}
          </h1>
          <p>
            "Club Of DEvelopers is an initiative of the students of Computer science and Engineering department, Biet Jhansi"
            <br />
            <br /> CODE aims to establish a coding culture on campus, reaching
            every student passionate about development.
            <br />
            <br />
            The club's motto is to{" "}
            <b className="Headingspan">Learn-Build-Innovate</b>
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutCode;
