import React from "react";
import img from "../assets/goal.svg";
function Mission() {
  return (
    <div className="aboutCODE">
      <section>
        <div className="aboutHead ">
          <h1 className="BlockHeading">
            Our <span className="Headingspan">Goal</span>
          </h1>
          <p>
            "" Club Of Developers’ mission is to create a better learning and
            collaborative atmosphere in the campus where they can learn and
            explore new technologies and can enhance their skills ""
          </p>
        </div>
        <div className="aboutImage asdf">
          <img src={img} alt="s" className="aboutImg"></img>
        </div>
      </section>
    </div>
  );
}

export default Mission;
