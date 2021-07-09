import React from "react";
import { Link } from "react-router-dom";
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC",
];
const JobCard = ({
  title,
  startedBy,
  department,
  workType,
  remote,
  duration,
  stipend,
  applyBy,
  skills,
  jobDescription,
  totalOpening,
  _id,
}) => {
  const starts = new Date(startedBy);
  const hour = starts.getHours() % 12 == 0 ? 12 : starts.getHours() % 12;
  const minutes = starts.getMinutes();
  const AM_PM = starts.getHours() < 12 ? "AM" : "PM";
  const year = starts.getFullYear();
  const date = starts.getDate();
  const month = months[starts.getMonth()];

  return (
    <div className="cardJob">
      <Link to={"/jobs/" + _id}>
        <div className="card">
          <div className="cardHeader"></div>

          <div className="cardMain">
            <p>{title}</p>
            <p>{remote}</p>
            <div className="eventDetails">
              <div className="eventInfo">
                <p className="eventInfo-header">
                  <i
                    className="far fa-calendar-alt"
                    style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                  ></i>
                  <b>Posted On</b>
                </p>
                <p>
                  {hour +
                    ":" +
                    minutes +
                    " " +
                    AM_PM +
                    ", " +
                    date +
                    " " +
                    month +
                    " " +
                    year}
                </p>
              </div>
              <div className="eventInfo">
                <p className="eventInfo-header">
                  <b>Domain</b>
                </p>
                <p> {department} </p>
              </div>
              <div className="eventInfo ">
                <p className="eventInfo-header">
                  <i
                    className="fas fa-map-marked-alt"
                    style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                  ></i>
                  <b>Work Type</b>
                </p>
                <p>{workType}</p>
              </div>
            </div>
            <div className="eventDetails">
              <div className="eventInfo">
                <p className="eventInfo-header">
                  <i
                    className="far fa-calendar-alt"
                    style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                  ></i>
                  <b>Duration</b>
                </p>
                <p>{duration}</p>
              </div>
              <div className="eventInfo">
                <p className="eventInfo-header">
                  <i
                    className="fas fa-rupee-sign"
                    style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                  ></i>
                  <b>Stipend</b>
                </p>
                <p> {stipend} </p>
              </div>
              <div className="eventInfo ">
                <p className="eventInfo-header">
                  <i
                    className="fas fa-map-marked-alt"
                    style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                  ></i>
                  <b>Openings</b>
                </p>
                <p>{totalOpening}</p>
              </div>
            </div>

            <div className="eventInfo ">
              <p className="eventInfo-header">
                <b>Skills</b>
              </p>
              <div className="tagsContainer">
              {JSON.parse(skills).map((skill) => (
                <div className="tags">{skill}</div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
