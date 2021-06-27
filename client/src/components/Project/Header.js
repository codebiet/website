import React from "react";
import header_img from "../assets/header.svg";
import Typewriter from "typewriter-effect";

function Header() {
  return (
    <div className="banner project-header-container">
      <div className="content">
        <div className="leader">
          <img src={header_img} className="image" />
        </div>

        <div className="t">
          <h1 className="Hd">
            <Typewriter
              options={{
                strings: ["OUR PROJECTS"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p>
            One can see the potential of our students in the exemplary projects
            they have made using a wide range of technologies. Their
            determination to learn and grow and their creativity can be seen in
            the remarkable work they have done during Buildathon!
          </p>
        </div>
      </div>
    </div>
  );
}
export default Header;
