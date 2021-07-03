import React from "react";
import profile_img from "../assets/dev.jpeg";
import Vipin from "../assets/final Year/Vipin Gautam.jpg";
import Manal from "../assets/final Year/manal_sir.jpg";
import Tanu from "../assets/final Year/Tanu Agrawal.jpg";
const ExecutiveItem = (props) => {
  return (
    <div className="exe_main_cot">
      <img src={props.src} alt="profile-pic" className="cards_item_img1" />
      <p className="exe_name">
        <b>{props.name}</b>
      </p>
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
      <div className="executives">
        <ExecutiveItem
          src={Manal}
          name="Manal Jain"
          facebook="#"
          linkedn="https://www.linkedin.com/in/manal-jain/"
          mail="mailto:manaljain6667@gmail.com"
        />
        <ExecutiveItem
          src={Vipin}
          name="Vipin Gautam"
          facebook="#"
          linkedn="https://www.linkedin.com/in/vipin-gautam-b95531186/"
          mail="mailto:vipingautam.m@gmail.com"
        />
        <ExecutiveItem
          src={Tanu}
          name="Tanu Agarwal"
          facebook="#"
          linkedn="#"
          mail="mailto:tanuagrawal1389@gmail.com"
        />
      </div>
    </div>
  );
}

export default Executives;
