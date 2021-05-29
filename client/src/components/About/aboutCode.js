import React from "react";
import img from "../assets/aboutImage.jpg";
function AboutCode() {
  return (
    <div className="mission">
      <section>
        <h1>About C.O.D.E</h1>
        <div className="aboutImage">
          <img src={img} alt="about-us" className="aboutImg"></img>
        </div>
        <div>
          <p>
            ""Club of Developers is an initiative of The Department of Computer
            Science & Engineering, BIET Jhansi. CODE aims to establish a coding
            culture on campus, reaching every student passionate about
            development. The club's motto is to Learn-Build-Innovate. CODE is
            for everyone, regardless of their field of study or their current
            level of knowledge ""{" "}
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutCode;
