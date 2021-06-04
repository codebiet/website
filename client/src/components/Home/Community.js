import React, { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import employeeDiscussingImg from "../assets/employee-discussing-strategy-in-the-office-2127132.png";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
const stats = [
  {
    fontawesomeIconClass: "fa fa-users",
    iconStyling: { color: "#ffd000", fontSize: "30px" },
    heading: "Students",
    statCount: 500,
  },
  {
    fontawesomeIconClass: "fas fa-code",
    iconStyling: { color: "#589af1", fontSize: "30px" },
    heading: "Technologies",
    statCount: 15,
  },
  {
    fontawesomeIconClass: "fa fa-object-group",
    iconStyling: { color: "#ff9737", fontSize: "30px" },
    heading: "Projects",
    statCount: 45,
  },
  {
    fontawesomeIconClass: "fas fa-calendar",
    iconStyling: { color: "#8660fe", fontSize: "30px" },
    heading: "Events",
    statCount: 7,
  },
  {
    fontawesomeIconClass: "fas fa-graduation-cap",
    iconStyling: { color: "#060058", fontSize: "30px" },
    heading: "Mentors",
    statCount: 35,
  },
  {
    fontawesomeIconClass: "fa fa-user-plus",
    iconStyling: { color: "#5df158", fontSize: "30px" },
    heading: "Team",
    statCount: 26,
  },
];
const CountUpComponent = ({ end }) => {
  return (
    <CountUp end={end} redraw={true} useEasing={false}>
      {({ countUpRef, start }) => (
        <VisibilitySensor onChange={start} delayedCall>
          <span
            style={{
              fontWeight: "inherit",
              color: "inherit",
              fontSize: "inherit",
            }}
            ref={countUpRef}
          />
        </VisibilitySensor>
      )}
    </CountUp>
  );
};
const Stat = ({ fontawesomeIconClass, iconStyling, heading, statCount }) => {
  return (
    <div className="col-lg-2 stat-card col-md-4 col-sm-6 text-center">
      <div
        className="icon"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-once={true}
        data-aos-duration="1000"
      >
        <i className={fontawesomeIconClass} style={iconStyling}></i>
      </div>
      <h3 style={{ textAlign: "center" }}>
        <CountUpComponent end={statCount} />
      </h3>
      <p>{heading}</p>
    </div>
  );
};
const Community = (props) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <section
      className="image-with-content py-5"
      data-aos="fade-right"
      data-aos-delay="100"
      data-aos-once={true}
      data-aos-duration="1000"
    >
      <div className="container py-md-5 py-4">
        <div
          className="row align-items-center"
          data-aos="fade-right"
          data-aos-delay="100"
          data-aos-once={true}
          data-aos-duration="1000"
        >
          <div className="col-lg-6 content-sec-1">
            <h3 className="title-style mb-3">
              Reasons why we love sharing the knowledge to our{" "}
              <span style={{ fontWeigth: 700, fontSize: "inherit" }}>
                Community
              </span>
            </h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit doloremque
              laudantium, totam rem aperiam, veritatis et quasi.
            </p>
            <Link className="btn btn-style mt-lg-5 mt-4" to="">
              Wanna Know More?
            </Link>
          </div>
          <div
            className="col-lg-6 pl-lg-5 mt-lg-0 mt-5"
            data-aos="fade-left"
            data-aos-delay="100"
            data-aos-once={true}
            data-aos-duration="1000"
          >
            <img
              src={employeeDiscussingImg}
              alt="product"
              className="img-responsive"
            />
          </div>
        </div>

        {/* <!-- ======================= stats ======================== --> */}
        <div className="col-lg-12" id="why-us">
          <div className="container">
            <div
              className="counters"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-once={true}
              data-aos-duration="1000"
            >
              {stats.map((stat) => {
                return <Stat key={stat.fontawesomeIconClass} {...stat} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Community;
