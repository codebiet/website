import React from "react";
import img from "../assets/vission.svg";

function Mission() {
  return (
    <div className="aboutCODE">
      <section>
        <div className="aboutImage">
          <img src={img} alt="about-img" className="aboutImg"></img>
        </div>
        <div className="aboutHead">
          <h1 className="BlockHeading">
            Why we are building <span className="Headingspan">C.O.D.E</span>
          </h1>
          <ul id="Visionlist">
            <li className="VisionlistItems">
              To provide a platform to the students so that they can compete
              with other students of the same or different colleges.
            </li>
            <li className="VisionlistItems">
              To make the students aware of the latest technologies prevailing
              in the current scenario.
            </li>
            <li className="VisionlistItems">
              To set up a supportive technical community that encourages
              innovative ideas.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Mission;
