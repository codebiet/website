import React from "react";
import user_image from "../assets/boy.png";

const Header = (props) => {
  return (
    <div className="header-container">
      <div className="outerContainer">
        <div className=" inner firstContainer ">
          <div className="side1Container">
            <div className="common">
              <div>
                {props.user.profilePhoto && (
                  <img
                    src={props.user.profilePhoto}
                    className="head_image"
                    width="140px"
                    height="150px"
                    alt=""
                    style={{ maxWidth: "unset" }}
                    alt=""
                  />
                )}
                {!props.user.profilePhoto && (
                  <img
                    src={user_image}
                    className="head_image"
                    width="140px"
                    height="150px"
                    alt=""
                    style={{ maxWidth: "unset" }}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>

          <div className="side2Container">
            <div className="common ">
              <div className="containerInside2">
                <div className="startName">
                  <p className="name">{props.user.name}</p>
                  <p className="designation">{props.user.role}</p>
                </div>

                <div className="mainDetails">
                  <p>
                    <i className="containerIcon fas fa-phone-alt"></i>
                    {props.user.whatsAppPhoneNumber}
                  </p>

                  {/* <p>
                    <i className="containerIcon fas fa-location-arrow"></i>
                    570, Sector-31 Noida
                  </p>
                  <p>
                    <i className="containerIcon fas fa-globe"></i>
                    www.codebietjh.com
                 </p>*/}
                  <p>
                    <i className="containerIcon fas fa-envelope"></i>
                    {props.user.email}
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
