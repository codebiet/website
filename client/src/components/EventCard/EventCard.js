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
const EventCard = ({
  name,
  startsOn,
  entryFee,
  venue,
  cardImg,
  shortDescription,
  tags,
  _id,
}) => {
  const starts = new Date(startsOn);
  const hour = starts.getHours() % 12 == 0 ? 12 : starts.getHours() % 12;
  const minutes = starts.getMinutes();
  const AM_PM = starts.getHours() < 12 ? "AM" : "PM";
  const year = starts.getFullYear();
  const date = starts.getDate();
  const month = months[starts.getMonth()];
  return (
    <div className="cardEvent">
      <Link to={"/events/" + _id}>
        <div className="card">
          <div className="cardHeader">
            <div className="cardHeaderInner">
              <img src={cardImg} alt="cardimage" className="cardImage"></img>
            </div>
          </div>

          <div className="cardMain">
            <p>{name}</p>
            <div className="eventDetails">
              <div className="eventInfo">
                <p className="eventInfo-header">
                  <i
                    className="far fa-calendar-alt"
                    style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                  ></i>
                  <b>Starts On</b>
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
                  <i
                    className="fas fa-rupee-sign"
                    style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                  ></i>
                  <b>Entry Fees</b>
                </p>
                <p> {entryFee} </p>
              </div>
              <div className="eventInfo ">
                <p className="eventInfo-header">
                  <i
                    className="fas fa-map-marked-alt"
                    style={{ marginRight: ".1rem", fontSize: ".8rem" }}
                  ></i>
                  <b>Venue</b>
                </p>
                <p>{venue}</p>
              </div>
            </div>
            <div className="shortDescription">{shortDescription}</div>
            <div className="tagsContainer">
              {tags.map((tag) => (
                <div className="tags">{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
