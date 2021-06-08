import React from "react";
import user_image from "../assets/userProfileImg.jpg";
const Header = (props) => {
  return (
    <div className="header-container">
      <div className="outerContainer">
        <div className=" inner firstContainer ">
          <div className="side1Container">
            <div className="common">
              <div>
                <img
                  src={user_image}
                  className="head_image"
                  width="140px"
                  height="150px"
                  alt=""
                  style={{maxWidth:"unset"}}
                />
              </div>
            </div>
          </div>

          <div className="side2Container">
            <div className="common ">
              <div className="containerInside2">
                <div className="startName">
                  <p className="name">HENNA BEKAR</p>
                  <p className="designation">Graphic Designer</p>
                </div>

                <div className="mainDetails">
                  <p>
                    <i className="containerIcon fas fa-phone-alt"></i>
                    +91-9878564589
                  </p>

                  <p>
                    <i className="containerIcon fas fa-location-arrow"></i>
                    570, Sector-31 Noida
                  </p>
                  <p>
                    <i className="containerIcon fas fa-globe"></i>
                    www.codebietjh.com
                  </p>
                  <p>
                    <i className="containerIcon fas fa-envelope"></i>
                    singhsharad529@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
