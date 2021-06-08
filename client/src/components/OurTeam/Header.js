import React from "react";
import header_img from "../assets/OurTeamheader.svg";
function Header() {
  return (
    <div className="banner">
      <div className="content">
        <h1 className="leader">Club Of DEvelopers</h1>
        <p>
          Club Of DEveloper is an initiative of The Department of Computer
          Science & Engineering,BIET Jhansi. CODE aims to establish a coding
          culture on campus, reaching every student passionate about
          development. The club's motto is to Learn-Build-Innovate. CODE is for
          everyone, regardless of their field of study or their current level of
          knowledge.
        </p>
      </div>
      <img src={header_img} className="image" />
    </div>
  );
}
export default Header;
