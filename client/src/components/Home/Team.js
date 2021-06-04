import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import img1 from "../assets/team4.jpg";
const TeamMemberData = [
  {
    name: "Ritesh Rai",
    description:
      "This is basic card with image on top, title, description and button.",
    img: img1,
    detailedText:
      "This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.",
  },
  {
    name: "Samarth Agrawal",
    description:
      "This is basic card with image on top, title, description and button.",
    img: img1,
    detailedText:
      "This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.",
  },
  {
    name: "Rajat Saxena",
    description:
      "This is basic card with image on top, title, description and button.",
    img: img1,
    detailedText:
      "This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.",
  },
];
const TeamMember = ({ name, description, img, detailedText }) => {
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
                    <Link
                      className="social-icon text-xs-center"
                      target="_blank"
                      to="#"
                    >
                      <img src="https://img.icons8.com/fluent/32/000000/facebook-new.png" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      className="social-icon text-xs-center"
                      target="_blank"
                      to="#"
                    >
                      <img src="https://img.icons8.com/color/32/000000/twitter-circled.png" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      className="social-icon text-xs-center"
                      target="_blank"
                      to="#"
                    >
                      <img src="https://img.icons8.com/fluent/32/000000/linkedin.png" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      className="social-icon text-xs-center"
                      target="_blank"
                      to="#"
                    >
                      <img src="https://img.icons8.com/fluent/32/000000/instagram-new.png" />
                    </Link>
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
