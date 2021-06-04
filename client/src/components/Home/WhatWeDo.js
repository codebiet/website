import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
const cardsData = [
  {
    iconClass: "fas fa-code",
    iconStyling: {
      background: { background: "#fceef3" },
      color: { color: "#ff689b" },
    },
    heading: "DEVELOPMENT",
    description:
      "We build a team of passionate developers to collaborate and contribute to open source projects, build applications and bring up innovative ideas.",
    linkTo: "",
  },
  {
    iconClass: "fas fa-users",
    iconStyling: {
      background: { background: "#fff0da" },
      color: { color: "#e98e06" },
    },
    heading: "MENTORSHIP FOR INTERVIEWS",
    description:
      "Mentorship from experts who have cracked various interviews. Equipping candidates with skills to ace interviews.",
    linkTo: "",
  },
  {
    iconClass: "fas fa-book",
    iconStyling: {
      background: { background: "#e6fdfc" },
      color: { color: "#3fcdc7" },
    },
    heading: "PLACEMENT PREPARATION",
    description:
      "Making the students ready for the placement drives and recruitments under the guidance of our well placed seniors.",
    linkTo: "",
  },
  {
    iconClass: "fas fa-graduation-cap",
    iconStyling: {
      background: { background: "#eafde7" },
      color: { color: "#41cf2e" },
    },
    heading: "GATE",
    description:
      "Taking students' GATE preparation to the next level by providing them with resources and guidance for their GATE exam.We not only focused on",
    linkTo: "",
  },
  {
    iconClass: "fas fa-briefcase",
    iconStyling: {
      background: { background: "#e1eeff" },
      color: { color: "#2282ff" },
    },
    heading: "INTERNSHIPS / JOBS",
    description:
      "We provide students a platform to hone their skills and bring forth various internships and job opportunities.",
    linkTo: "",
  },
  {
    iconClass: "fas fa-video",
    iconStyling: {
      background: { background: "#ecebff" },
      color: { color: "#8660fe" },
    },
    heading: "WORKSHOPS",
    description:
      "We organize workshops with many industry experts for the betterment of students on fifferent latest technologies.",
    linkTo: "",
  },
];
const Card = ({ iconClass, iconStyling, heading, description, linkTo }) => {
  return (
    <div
      className="col-md-6 col-sm-12 col-lg-4 wow bounceInUp"
      data-aos="zoom-in"
      data-aos-delay="100"
      data-aos-once={true}
      data-aos-duration="1000"
    >
      <div className="box">
        <div className="icon" style={iconStyling.background}>
          <i className={iconClass} style={iconStyling.color}></i>
        </div>
        <h4 className="title">
          <Link to={linkTo}>{heading}</Link>
        </h4>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};
const WhatWeDo = (props) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <section
      className="about-section py-5"
      data-aos="zoom-up"
      data-aos-delay="100"
      data-aos-once={true}
      data-aos-duration="1000"
      id="whatWeDoSection"
    >
      <div className="container py-lg-5 py-4">
        <h2
          className="section-heading"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-once={true}
          data-aos-duration="1000"
        >
          What We Do ?
        </h2>
        <p className="section-text">
          CODE provides students a community to grow and share their knowledge.
          We also provide an interactive space for students to brainstorm new
          ideas and their beautiful solutions. Students will get to learn about
          various emerging technologies like Mobile/Web Dev, ML, AI, and
          moreover, a number of workshops will be conducted to resolve queries
          of students related to Gate, Placement, Internship, and the latest
          technologies.
        </p>

        <div className="row" id="services">
          {cardsData.map((cardData) => {
            return <Card key={cardData.iconClass} {...cardData} />;
          })}
        </div>
      </div>
    </section>
  );
};
export default WhatWeDo;
