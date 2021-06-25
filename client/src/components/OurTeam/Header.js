import React from "react";
import header_img from "../assets/OurTeamheader.svg";
function Header() {
  return (
    <div className="banner">
      <div className="content">
        <h1 className="leader">Club Of DEvelopers</h1>
        <p>
          Our team is a family of members of code. Our team consists of various
          members who together make a perfect Team. Three founder members are
          there for the planning and growth. There are three executive members
          responsible for the plan execution. There are 9 operating members and
          9 members in assistance. There are 20 dedicated mentors for the
          technical guidance and 300+ active members of the club.
        </p>
      </div>
      <img src={header_img} className="image" />
    </div>
  );
}
export default Header;
