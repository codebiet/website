import React from "react";
import profile_img from "../assets/dev.jpeg";

const ExecutiveItem = (props) => {
  return (
    <div className="exe_main_cot">
      <img src={props.src} alt="profile-pic" className="cards_item_img1" />
      <p className="exe_name">{props.name}</p>
      <div style={{ padding: "0px 0px 5px 0px" }} className="des">
        <a className="icn" href={props.facebook}>
          <i
            className="fab fa-facebook"
            style={{ color: "#ec7c2d", fontSize: "1.5rem" }}
          />
        </a>
        <a className="icn" href={props.linkedn}>
          <i
            className="fab fa-linkedin"
            style={{ color: "#ec7c2d", fontSize: "1.5rem" }}
          />
        </a>
        <a className="icn" href={props.mail}>
          <i
            className="fas fa-envelope"
            style={{ color: "#ec7c2d", fontSize: "1.5rem" }}
          />
        </a>
      </div>
    </div>
  );
};
function Executives() {
  return (
    <div className="exe aboutCODE">
      <h1 className="BlockHeading">
        Our <span className="Headingspan">Executives</span>
      </h1>
      <p exe_tag>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis ex
        mol
      </p>
      <div class="executives">
        <ExecutiveItem
          src={profile_img}
          name="Monal Jain"
          facebook="#"
          linkedn="#"
          mail="#"
        />
        <ExecutiveItem
          src={profile_img}
          name="Vipin Gautam"
          facebook="#"
          linkedn="#"
          mail="#"
        />
        <ExecutiveItem
          src={profile_img}
          name="Tanu Agarwal"
          facebook="#"
          linkedn="#"
          mail="#"
        />
      </div>
    </div>
  );
}

export default Executives;
