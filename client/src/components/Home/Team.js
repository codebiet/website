import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import Ritesh from "../assets/final Year/ritesh_rai_sir_1.jpg";
import Samarth from "../assets/final Year/Samarth_Agarwal_Sir.jpg";
import Rajat from "../assets/final Year/Rajat Saxena.jpg";
const TeamMemberData = [
  {
    name: "Ritesh Rai",
    description:
      "This is basic card with image on top, title, description and button.",
    img: Ritesh,
    detailedText:
      "This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.",
    fbLink: "https://www.facebook.com/profile.php?id=100023781995286",
    lnkdinLink: "https://www.linkedin.com/in/ritesh-rai-3741ba178",
    email: "riteshrai447@gmail.com",
  },
  {
    name: "Samarth Agrawal",
    description:
      "This is basic card with image on top, title, description and button.",
    img: Samarth,
    detailedText:
      "This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.",
    fbLink: "https://www.facebook.com/samarthagarwal1414/",
    lnkdinLink: "https://www.linkedin.com/in/samarth-agarwal-545429133/",
    email: "samarthagarwal1414@gmail.com",
  },
  {
    name: "Rajat Saxena",
    description:
      "This is basic card with image on top, title, description and button.",
    img: Rajat,
    detailedText:
      "This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.",
    fbLink: "https://www.facebook.com/rajat.saxena.90410",
    lnkdinLink: "https://www.linkedin.com/in/rajat-saxena-54509a15b/",
    email: "saxena1975sanjeev@gmail.com",
  },
];
const TeamMember = ({ name, description, img, detailedText,fbLink,lnkdinLink,email }) => {
  return (
    <div
      className="col-xs-12 col-sm-6 col-md-4"
      data-aos="zoom-out-down"
      data-aos-delay="100"
      data-aos-once={true}
    >
      <div className="image-flip">
        <div className="mainflip flip-0">
          <div className="frontside">
            <div className="card" style={{ marginBottom: "0!important" }}>
              <div className="card-body text-center">
                <p>
                  <img className="img-fluid" src={img} alt="card image" />
                </p>
                <h4 className="card-title" style={{ fontWeight: 600 }}>
                  {name}
                </h4>
                <p className="card-text">{description}</p>
                <Link to="#" className="flip">
                  <img src="https://img.icons8.com/android/24/000000/right3.png" />
                </Link>
              </div>
            </div>
          </div>
          <div className="backside">
            <div className="card" style={{ marginBottom: "0" }}>
              <div className="card-body text-center mt-4">
                <h4 className="card-title" style={{ fontWeight: 600 }}>
                  {name}
                </h4>
                <p className="card-text">{detailedText}</p>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a
                      className="social-icon text-xs-center"
                      target="_blank"
                      href={fbLink}
                    >
                      <img src="https://img.icons8.com/fluent/32/000000/facebook-new.png" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="social-icon text-xs-center"
                      target="_blank"
                      href="#"
                    >
                      <img src="https://img.icons8.com/color/32/000000/twitter-circled.png" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="social-icon text-xs-center"
                      target="_blank"
                      href={lnkdinLink}
                    >
                      <img src="https://img.icons8.com/fluent/32/000000/linkedin.png" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="social-icon text-xs-center"
                      target="_blank"
                      href="#"
                    >
                      <img src="https://img.icons8.com/fluent/32/000000/instagram-new.png" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Team = (props) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <section
      id="team"
      className="pb-5 grey-bg"
      data-aos="zoom-in"
      data-aos-delay="100"
      data-aos-once={true}
      data-aos-duration="400"
    >
      <div className="container">
        <h3 className="section-heading title-style mb-3">
          <span style={{ fontSize: "inherit", fontWeight: 700 }}>OUR TEAM</span>
        </h3>
        <div className="row card-group">
          {TeamMemberData.map((memberData) => (
            <TeamMember key={memberData.name} {...memberData} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
