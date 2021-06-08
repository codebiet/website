import React from "react";
const Member = ({ name, im, post, mail, fb_link, lnkdin_link }) => {
  return (
    <div className="cardm">
      <div className="imgem">
        <img src={im} alt="Team Member" />
      </div>
      <div className="titlem">
        <h4>{name}</h4>
      </div>

      <div style={{ padding: "0px 0px 5px 0px" }} className="desm">
        <a className="icnm" href={fb_link} target="_blank">
         <i className="fab fa-facebook" style={{fontSize:"inherit",color:"inherit"}}></i>
        </a>
        <a className="icnm" href={lnkdin_link} target="_blank">
          <i className="fab fa-linkedin" style={{fontSize:"inherit",color:"inherit"}}></i>
        </a>
        <a className="icnm" href={mail} target="_blank">
          <i className="fas fa-envelope-square" style={{fontSize:"inherit",color:"inherit"}}></i>
        </a>
      </div>
    </div>
  );
};

export default Member;
